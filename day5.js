import {parseDay5Data} from './helpers/data-parser.js';
import _ from 'lodash';

const MAP_SIZE = 1000;

function getCleanMap() {
	return Array(MAP_SIZE).fill(0).map(() => Array(MAP_SIZE).fill(0));
}

async function main() {
	let data = parseDay5Data();

    let map = getCleanMap();

    data.forEach(aValuePair => {
        let firstPoint = aValuePair[0];
        let secondPoint = aValuePair[1];

        if((firstPoint[0] === secondPoint[0]) || (firstPoint[1] === secondPoint[1])) {
            if(firstPoint[0] === secondPoint[0]) {
                let y1 = Math.min(firstPoint[1], secondPoint[1]);
                let y2 = Math.max(firstPoint[1], secondPoint[1]);

                for (let index = y1; index <= y2; index++) {
                    map[firstPoint[0]][index]++;
                }
            }
            else {
                let x1 = Math.min(firstPoint[0], secondPoint[0]);
                let x2 = Math.max(firstPoint[0], secondPoint[0]);

                for (let index = x1; index <= x2; index++) {
                    map[index][secondPoint[1]]++;
                }
            }
        }
        else {
            let xMovingDown = firstPoint[0] > secondPoint[0];
            let yMovingDown = firstPoint[1] > secondPoint[1];
            let y = firstPoint[1];

            if(xMovingDown){
                for(let x = firstPoint[0]; x>=secondPoint[0]; x--){
                    map[x][y]++;
                    yMovingDown ? y-- : y++
                }
            }else{
                for(let x = firstPoint[0]; x<=secondPoint[0]; x++){
                    map[x][y]++;
                    yMovingDown ? y-- : y++
                }
            }


        }
    });

    console.log('intersections: ', _.filter(_.flatten(_.flatten(map)), aVal => aVal > 1).length);

}

main();
