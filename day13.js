import _ from 'lodash';
import fs from 'fs';

const AXIS = {
    'X': 'x',
    'Y': 'y'
}

const input = fs
	.readFileSync('./data/day13.txt', 'utf8')
	.split('\r\n')
	.map((a) => !a.startsWith('fold along') ? a.split(',').map(aValue => parseInt(aValue, 10)): a);

const indexOfFirstFold = _.findIndex(input, aInput => _.isString(aInput));

input.splice(indexOfFirstFold - 1, 1);

const instructions = _.map(input.splice(indexOfFirstFold - 1, input.length - (indexOfFirstFold - 1)), aFoldingInstruction => aFoldingInstruction.match(/[xy]=[0-9]+/g).join('').split('=').map((aValue, aIndex) => aIndex === 1 ? parseInt(aValue, 10): aValue));

const getCleanMap = (aMaxX, aMaxY) => {
    return Array(aMaxY).fill(0).map(() => Array(aMaxX).fill(0));
}

const createMap = (aInput) => {
    let maxX = _.max(aInput.map(aLine => aLine[0])) + 1;
    let maxY = _.max(aInput.map(aLine => aLine[1])) + 1;
    let map = getCleanMap(maxX, maxY);

    aInput.forEach(aDot => {
        map[aDot[1]][aDot[0]] = 1;
    });

    return map;
}

const foldMapOnAxis = (aAxis, aPosition, aMap) => {
    let foldedSide = [];
    let foldedMap = [];

    if(aAxis === AXIS.Y) {
        let fullMap = _.chunk(_.filter(aMap, (aItem, aIndex) => aIndex !== aPosition), aPosition);
        foldedMap = fullMap[0];
        foldedSide = fullMap[1];

        if(foldedMap.length > foldedSide.length) {
            let missingElements = foldedMap.length - foldedSide.length;
            foldedSide.push(...Array(missingElements).fill(0).map(() => Array(foldedSide[0].length).fill(0)))
        }

        foldedSide = _.reverse(foldedSide);
    }
    else {
        let fullMap = _.map(aMap, (aMapItem) => _.chunk(_.filter(aMapItem, (aRowEntry, aIndex) => aIndex !== aPosition), aPosition));

        fullMap = _.map(fullMap, aMapEntry => {
            if(aMapEntry[0].length > aMapEntry[1].length) {
                let missingElements =  aMapEntry[0].length - aMapEntry[1].length;
                aMapEntry[1].push(...Array(missingElements).fill(0));
            }

            return [aMapEntry[0], aMapEntry[1]];
        })

        foldedMap = _.map(fullMap, aRowElement => aRowElement[0]);
        foldedSide = _.map(fullMap, aRowElement => _.reverse(aRowElement[1]));
    }

    return _.map(_.zip(foldedMap, foldedSide), aRowArray => _.map(aRowArray, aItem => _.map(aItem, (b, i) => aRowArray[0][i] + aRowArray[1][i] >= 1 ? 1 : 0))[0]);
}

const calcPoints = (aFoldedMap) => {
    return _.reduce(_.flatten(aFoldedMap), (aPrev, aCurr) => aPrev + aCurr, 0);
}

let map = createMap(input);

_.forEach(instructions, aInstruction => {
    map = foldMapOnAxis(aInstruction[0], aInstruction[1], map);
    console.log(calcPoints(map));
});

console.log('part2: ', map);