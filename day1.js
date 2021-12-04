import fetch from 'node-fetch';
import {parseDay1Data} from './helpers/data-parser.js';

async function main() {

    const mappedDepths = parseDay1Data();

    console.log('mapped length: ', mappedDepths.length);

    let previousSize = 999999;
    let amountIncreased = 0;

    // solution1
    mappedDepths.forEach(aDepth => {
        if(parseInt(aDepth, 10) > previousSize) {
            amountIncreased++;
        }

        previousSize = aDepth;
    });

    console.log('solution 1: ', amountIncreased);

    // solution 2
    let bufferArray = [];
    let previousBufferArray = [];
    let amountSumIncreased = 0;

    mappedDepths.forEach(aDepth => {
        if(bufferArray.length > 2) {
            if(previousBufferArray.length > 0) {
                previousBufferArray = [...bufferArray];
                bufferArray.shift();
                bufferArray.push(parseInt(aDepth, 10));

                let sumPrevious = 0;
                let sum = 0;
                bufferArray.forEach(aBufferValue => sum += aBufferValue);
                previousBufferArray.forEach(aBufferValue => sumPrevious += aBufferValue);

                if(sum > sumPrevious) {
                    amountSumIncreased++;
                }
            }
            else {
                previousBufferArray = bufferArray;
            }
        } else {
            bufferArray.push(parseInt(aDepth, 10));
        }
    });

    // console.log('solution 2: ', amountSumIncreased);
    console.log('solution 2: ', ++amountSumIncreased);

    let counter = 0;
    for (let i = 1; i < mappedDepths.length - 2; i++) {
        if (mappedDepths[i - 1] < mappedDepths[i + 2]) {
            counter++;
        }
    }

    console.log('counter: ', counter);

    fetch('https://adventofcode.com/2021/day/1/input')
        .then(res => res.text())
        .then(text => console.log(text));
}

main();