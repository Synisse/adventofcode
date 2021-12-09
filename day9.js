import {parseDay9Data} from './helpers/data-parser.js';
import _ from 'lodash';

function findNeighbours(aXCoordinate, aYCoordinate, aReferenceMap) {
    let neighbours = [];

    if (aXCoordinate > 0) {
        neighbours.push([aXCoordinate - 1, aYCoordinate]);
    }

    if (aYCoordinate > 0) {
        neighbours.push([aXCoordinate, aYCoordinate - 1]);
    }

    if (aXCoordinate < aReferenceMap[0].length - 1) {
        neighbours.push([aXCoordinate + 1, aYCoordinate]);
    }

    if (aYCoordinate < aReferenceMap.length - 1) {
        neighbours.push([aXCoordinate, aYCoordinate + 1]);
    }

    return neighbours;
}

function mapBasin(aBasinValues, widthPosition, heightPosition, aReferenceMap) {
    if (aBasinValues.filter(aBasinValue => _.isEqual(aBasinValue, {widthPos: widthPosition, heightPos: heightPosition})).length > 0 || aReferenceMap[heightPosition][widthPosition] === 9) {
        return;
    }

    aBasinValues.push({widthPos: widthPosition, heightPos: heightPosition});

    findNeighbours(widthPosition, heightPosition, aReferenceMap).forEach(([a, b]) => mapBasin(aBasinValues, a, b, aReferenceMap));

    return aBasinValues;
}

async function main() {
	const data = parseDay9Data();

    let grid = data.map((aRow) => [...aRow].map(Number));

    let mapSize = {
        height: grid.length,
        width: grid[0].length
    }

    let lowPointsSum = 0;

    let basins = [];

    for (let heightIndex = 0; heightIndex < mapSize.height; heightIndex++) {
        for (let widthIndex = 0; widthIndex < mapSize.width; widthIndex++) {
            if (findNeighbours(widthIndex, heightIndex, grid).every(([a, b]) => grid[b][a] > grid[heightIndex][widthIndex])) {
                lowPointsSum += grid[heightIndex][widthIndex] + 1;
                basins.push(mapBasin([], widthIndex, heightIndex, grid).length);
            }
        }
    }

    console.log('lowPointsSum: ', lowPointsSum);
    console.log('basins: ', basins);
    console.log('basinsproduct: ', basins.sort((a, b) => b - a).slice(0, 3).reduce((aPrev, aCurrent) => aPrev * aCurrent, 1));
}

main();
