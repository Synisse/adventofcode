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

async function main() {
    const input = fs.readFileSync('./data/data10.txt', 'utf8').split('\n').map(a => a.split(''));

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

    console.log('part1: ', _.sum(part1));
}

main();
