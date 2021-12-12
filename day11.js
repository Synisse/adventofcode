import _ from 'lodash';
import fs from 'fs';

const input = fs
	.readFileSync('./data/day11.txt', 'utf8')
	.split('\r\n')
	.map((a) => a.split('').map(b => parseInt(b, 10)));

let mapSize = {
    height: input.length,
    width: input[0].length
}

let allOctopi = mapSize.height * mapSize.width;
let activeOctopi = [];
let flashes = 0;
let cycles = 0;

function isInsideGrid(aX, aY) {
    return aX >= 0 && aY >= 0 && aX < mapSize.height && aY < mapSize.width;
}

function addEnergy(aX, aY) {
    if(isInsideGrid(aX, aY)){
        if(input[aX][aY] === 9) {
            input[aX][aY] = 0;
            flashes++;
            activeOctopi.push({xPos: aX, yPos: aY});
            addEnergyToNeighbours(aX, aY);
        } else {
            if (!(activeOctopi.filter(aOctopi => _.isEqual(aOctopi, {xPos: aX, yPos: aY})).length > 0)) {
                input[aX][aY] += 1;
            }
        }
    }
}

function addEnergyToNeighbours(aX, aY) {
    addEnergy(aX, aY + 1);
    addEnergy(aX, aY - 1);
    addEnergy(aX + 1, aY);
    addEnergy(aX - 1, aY);
    addEnergy(aX + 1, aY + 1);
    addEnergy(aX - 1, aY - 1);
    addEnergy(aX + 1, aY - 1);
    addEnergy(aX - 1, aY + 1);
}

function doCycle() {
    activeOctopi = [];

    for (let heightIndex = 0; heightIndex < mapSize.height; heightIndex++) {
        for (let widthIndex = 0; widthIndex < mapSize.width; widthIndex++) {
            addEnergy(heightIndex, widthIndex);
        }
    }
}

// part1
// _.range(100).forEach(a => {
//     doCycle();
// })

while(activeOctopi.length !== allOctopi) {
    cycles++;
    doCycle();
}

console.log('flashes: ', flashes);
console.log('cycles: ', cycles);
