import {parseDay7Data} from './helpers/data-parser.js';
import _ from 'lodash';


function calculateMedian(aSortedArray) {
    if (aSortedArray.length % 2 == 0) {
        return (aSortedArray[aSortedArray.length / 2] + aSortedArray[(aSortedArray.length / 2) - 1]) / 2;
    } else {
        return aSortedArray[Math.floor(aSortedArray.length / 2)];
    }
}

function calculateDistanceCosts(aData, aPos, aStepFunction) {
    return aData.reduce((aPrevValue, aValue) => aPrevValue + aStepFunction(Math.abs(aPos - aValue)), 0);
}

function stepFunction(aValue) {
    return aValue * (aValue + 1) / 2;
}

async function main() {
	const data = parseDay7Data();

    const median = calculateMedian(data.sort((a, b) => b - a));

    console.log('median: ', median);

    console.log('sum: ', _.sum(data.map(aValue => aValue > median ? aValue - median : median - aValue)));

    const mean = _.sum(data) / data.length;

    console.log('fuel: ', Math.min(calculateDistanceCosts(data, Math.ceil(mean), stepFunction), calculateDistanceCosts(data, Math.floor(mean), stepFunction)));
}

main();
