import {DAY1_DATA} from "../data/day1data.js";
import {DAY2_DATA} from "../data/day2data.js";
import {DAY3_DATA} from "../data/day3data.js";
import {DAY4_DATA} from "../data/day4data.js";

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