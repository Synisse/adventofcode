import {parseDay8Data} from './helpers/data-parser.js';
import _ from 'lodash';

const ONE_SEGMENTS = 2;
const SEVEN_SEGMENTS = 3;
const FOUR_SEGMENTS = 4;
const EIGHT_SEGMENTS = 7;

let overallSolution = 0;

let MAPPING_TABLE = [
    {
        value: 0,
        stringValue: undefined
    },
    {
        value: 1,
        stringValue: undefined
    },
    {
        value: 2,
        stringValue: undefined
    },
    {
        value: 3,
        stringValue: undefined
    },
    {
        value: 4,
        stringValue: undefined
    },
    {
        value: 5,
        stringValue: undefined
    },
    {
        value: 6,
        stringValue: undefined
    },
    {
        value: 7,
        stringValue: undefined
    },
    {
        value: 8,
        stringValue: undefined
    },
    {
        value: 9,
        stringValue: undefined
    },
]

function isUniqueNumber(aValue) {
    const {length} = aValue;

    return length === ONE_SEGMENTS || length === FOUR_SEGMENTS || length === SEVEN_SEGMENTS || length === EIGHT_SEGMENTS;
}

function substractDigitFromString(aLetterToSubstract, aString) {
    let aSubstractedString = aString;
    aLetterToSubstract.split('').forEach((aLetter) => {aSubstractedString = aSubstractedString.replace(aLetter, '')});

    return aSubstractedString;
}

function normalizeDigit(aDigit) {
    return aDigit.toLowerCase().split('').sort().join()
}

function isSameDigit(aFirstDigit, aSecondDigit) {
    return normalizeDigit(aFirstDigit) === normalizeDigit(aSecondDigit)
}

function setMappingTableValue(aNumber, aStringValue) {
    MAPPING_TABLE.find((aTableItem => aTableItem.value === aNumber)).stringValue = aStringValue;
}

function solveLetters(aTrainingSet, aSolution) {
    let zeroValue;
    let oneValue = aTrainingSet.find(aDigit => aDigit.length === ONE_SEGMENTS);
    setMappingTableValue(1, oneValue);
    let twoValue;
    let threeValue;
    let fourValue = aTrainingSet.find(aDigit => aDigit.length === FOUR_SEGMENTS);
    setMappingTableValue(4, fourValue);
    let fiveValue;
    let sixValue;
    let sevenValue = aTrainingSet.find(aDigit => aDigit.length === SEVEN_SEGMENTS);
    setMappingTableValue(7, sevenValue);
    let eightValue = aTrainingSet.find(aDigit => aDigit.length === EIGHT_SEGMENTS);
    setMappingTableValue(8, eightValue);
    let nineValue;

    let fiveSegmentValues = aTrainingSet.filter(aDigit => aDigit.length === 5);

    let topSplit = sevenValue;
    oneValue.split('').forEach((aLetter) => {topSplit = topSplit.replace(aLetter, '')});
    const topValue = topSplit;

    fiveSegmentValues.forEach((aFiveSegementValue => {
        let fiveSegmentNumber = substractDigitFromString(sevenValue, aFiveSegementValue);

        if(fiveSegmentNumber.length === 2) {
            threeValue = aFiveSegementValue;
            setMappingTableValue(3, threeValue);
        }
    }))

    let topLeftValue;

    topLeftValue = substractDigitFromString(threeValue, fourValue)[0];

    fiveSegmentValues.filter(aFiveSegementValue => aFiveSegementValue !== threeValue).forEach(aFiveSegementValue => {
        let fiveSegmentNumber = substractDigitFromString(threeValue, aFiveSegementValue);
        fiveSegmentNumber = fiveSegmentNumber.replace(topLeftValue, '');

        if(fiveSegmentNumber.length === 1) {
            twoValue = aFiveSegementValue
            setMappingTableValue(2, twoValue);
        } else {
            fiveValue = aFiveSegementValue;
            setMappingTableValue(5, fiveValue);

        }
    })

    let bottomLeft = substractDigitFromString(threeValue, twoValue)[0];
    sixValue = fiveValue + bottomLeft;
    setMappingTableValue(6, sixValue);

    nineValue = eightValue.replace(bottomLeft, '');
    setMappingTableValue(9, nineValue);

    let bottomValue = substractDigitFromString(fourValue, nineValue).replace(topValue, '')[0];
    let centerValue = substractDigitFromString([topLeftValue, bottomLeft, bottomValue].join(''), substractDigitFromString(sevenValue, eightValue));

    zeroValue = eightValue.replace(centerValue, '');
    setMappingTableValue(0, zeroValue);

    let numberAsString = '';

    aSolution.forEach((aDigit) => {
        numberAsString += MAPPING_TABLE.find(aTableItem => isSameDigit(aTableItem.stringValue, aDigit)).value;
    })

    overallSolution += parseInt(numberAsString, 10);
}

async function main() {
	const data = parseDay8Data();

    let aggregatedObjects = [];

    data.forEach((aDataObject) => {
        const splitObject = aDataObject.split('|');

        aggregatedObjects.push({
            learningData: splitObject[0].trim().split(' '),
            fourDigitData: splitObject[1].trim().split(' ')
        });
    });

    let digitCounter = 0;

    aggregatedObjects.forEach((aDigitObject) => {
        digitCounter += aDigitObject.fourDigitData.filter(aDigit => isUniqueNumber(aDigit)).length;

        solveLetters(aDigitObject.learningData, aDigitObject.fourDigitData);
    })

    console.log('digitCounter: ', digitCounter);
    console.log('overall solution: ', overallSolution);
}

main();
