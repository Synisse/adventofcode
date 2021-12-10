import _ from 'lodash';
import fs from 'fs';

const brackets = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
}

const values = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const bracketValues = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

const input = fs.readFileSync('./data/data10.txt', 'utf8').split('\r\n').map(a => a.split(''));

let part1 = input.map((aBracketLine) => {
    let bracketsMirror = [];

    for(let aBracket of aBracketLine) {
        if(_.isNil(brackets[aBracket])) {
            if(bracketsMirror[0] === aBracket) {
                bracketsMirror.shift();
            }
            else {
                return values[aBracket];
            }
        }
        else {
            bracketsMirror.unshift(brackets[aBracket]);
        }
    }
});

function isIncomplete(aBracketLine) {
    let bracketsMirror = [];

    for(let aBracket of aBracketLine) {
        if(_.isNil(brackets[aBracket])) {
            if(bracketsMirror[0] === aBracket) {
                bracketsMirror.shift();
            }
            else {
                return false;
            }
        }
        else {
            bracketsMirror.unshift(brackets[aBracket]);
        }
    }

    return !(bracketsMirror.length === 0)
}

function getRemainingBrackets(aBracketLine) {
    let bracketsMirror = [];

    for(let aBracket of aBracketLine) {
        if(_.isNil(brackets[aBracket])) {
            bracketsMirror.shift();
        }
        else {
            bracketsMirror.unshift(brackets[aBracket]);
        }
    }

    return bracketsMirror;
}


console.log(input.filter(isIncomplete).length);
let valueMap = _.map(input.filter(isIncomplete), getRemainingBrackets).map(aBracketLineEnding => aBracketLineEnding.reduce((aPrev, aCurrent) => (aPrev * 5) + bracketValues[aCurrent], 0)).sort((a, b) => a - b);
console.log(valueMap[Math.floor(valueMap.length / 2)]);

console.log('part1: ', _.sum(part1));
