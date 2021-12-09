import {parseDay6Data} from './helpers/data-parser.js';
import _ from 'lodash';

const DAYS = 256;

function spawnFish(aFishMap) {

    let amountOfFishToSpawn = aFishMap[0].numberOfFish;
    aFishMap[0].numberOfFish = 0;

    for (let i = 0; i < aFishMap.length - 1; i++) {
        aFishMap[i].numberOfFish = aFishMap[i + 1].numberOfFish
    }

    aFishMap[6].numberOfFish += amountOfFishToSpawn;
    aFishMap[8].numberOfFish = amountOfFishToSpawn;

    return aFishMap;
}

async function main() {
	let data = parseDay6Data();

    let fishMap = _.map(_.range(9), aVal => {return {daysToLive: aVal, numberOfFish: 0}});

    data.forEach(aData => {
        fishMap[aData].numberOfFish++;
    })

    _.times(DAYS).forEach(aDay => {
        fishMap = spawnFish(fishMap);
    });

    console.log('data sum: ', _.sum(_.map(fishMap, aFishInfo => aFishInfo.numberOfFish)));
}

main();
