import {DAY1_DATA} from "../data/day1data.js";
import {DAY2_DATA} from "../data/day2data.js";
import {DAY3_DATA} from "../data/day3data.js";
import {DAY4_DATA} from "../data/day4data.js";
import {DAY5_DATA, DAY5_DATA_DEMO} from "../data/day5data.js";
import {DAY6_DATA, DAY6_DATA_DEMO} from "../data/day6data.js";
import {DAY7_DATA, DAY7_DATA_DEMO} from "../data/day7data.js";
import {DAY8_DATA, DAY8_DATA_DEMO, DAY8_DATA_EXAMPLE} from "../data/day8data.js";
import {DAY9_DATA, DAY9_DATA_DEMO} from "../data/day9data.js";

export function parseDay1Data() {
    return DAY1_DATA.split('\n ').map(val => val.replace('   ', ''));
}

export function parseDay2Data() {
    const mappedValues = DAY2_DATA.split('\n').map(aValue => {
        const splitValue = aValue.split(' ');

        return {
            direction: splitValue[0].trim(),
            units: parseInt(splitValue[1].trim(), 10)
        }
    });

    return mappedValues;
}

export function parseDay3Data() {
    return DAY3_DATA.split('\n');
}

export function parseDay4Data() {
    return DAY4_DATA.split('\n');
}

export function parseDay5Data() {
    return DAY5_DATA.split('\n').map(aEntry => aEntry.split('->')).map(aPointValue => aPointValue.map(aVal => aVal.split(',').map(aVal => parseInt(aVal, 10))));
}

export function parseDay6Data() {
    return DAY6_DATA.split(',').map(aString => parseInt(aString, 10));
}

export function parseDay7Data() {
    return DAY7_DATA.split(',').map(aString => parseInt(aString, 10));
}

export function parseDay8Data() {
    return DAY8_DATA.split('\n');
}

export function parseDay9Data() {
    return DAY9_DATA.split('\n');
}