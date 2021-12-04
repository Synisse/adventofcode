import {parseDay3Data} from "./helpers/data-parser.js";

const CALCULATION_METHOD = {
    'OXYGEN': 'OXYGEN',
    'CO2': 'CO2',
    'DEFAULT': 'DEFAULT'
}

function initBitArray() {
    return Array.apply(null, Array(12)).map(() => 0);
}

function buildBitMap(aDataSet, aCalculationMethod) {
    const bitMap = initBitArray();
    const bitCollection = initBitArray();

    aDataSet.forEach(aBinary => {
        aBinary.split('').forEach((aSplitValue, aIndex) => {
            bitCollection[aIndex] += parseInt(aSplitValue, 10);
        })
    });

    bitCollection.forEach((aBitValue, aIndex) => {
        if((CALCULATION_METHOD.OXYGEN === aCalculationMethod ) && (aBitValue >= (aDataSet.length / 2))) {
            bitMap[aIndex] = 1;
        }
        else if(CALCULATION_METHOD.CO2 === aCalculationMethod) {
            bitMap[aIndex] = (aDataSet.length - aBitValue) <= (aDataSet.length / 2) ? 0 : 1;
        }
        else if((CALCULATION_METHOD.DEFAULT === aCalculationMethod ) && (aBitValue > (aDataSet.length / 2))) {
            bitMap[aIndex] = 1;
        }
    });

    return bitMap;
}

async function main() {
    const data = parseDay3Data();
    const bitCollection = initBitArray();
    let bitMap = [];
    let oxygenValues = data;
    let oxygenBitMap = [];
    let co2Values = data;
    let co2BitMap = [];

    bitCollection.forEach((undefined, aIndex) => {
        oxygenBitMap = buildBitMap(oxygenValues, CALCULATION_METHOD.OXYGEN);
        co2BitMap = buildBitMap(co2Values, CALCULATION_METHOD.CO2);

        let foundOxygenValues = [];
        let foundCO2Values = [];

        oxygenValues.forEach((aBinaryData) => {
            if(parseInt(aBinaryData.split('')[aIndex], 10) === oxygenBitMap[aIndex]) {
                foundOxygenValues.push(aBinaryData);
            }
        });

        co2Values.forEach((aBinaryData) => {
            if(parseInt(aBinaryData.split('')[aIndex], 10) === co2BitMap[aIndex]) {
                foundCO2Values.push(aBinaryData);
            }
        });

        oxygenValues = oxygenValues.length > 1 ? foundOxygenValues : oxygenValues;
        co2Values = co2Values.length > 1 ? foundCO2Values : co2Values;
    })

    console.log('oxygenValues: ', parseInt(oxygenValues[0], 2));
    console.log('co2Values: ', parseInt(co2Values[0], 2));
    console.log('life support rating: ', parseInt(oxygenValues[0], 2) * parseInt(co2Values[0], 2));

    bitMap = buildBitMap(data, CALCULATION_METHOD.DEFAULT);

    const gammaDecimalValue = parseInt(bitMap.join(''), 2);

    console.log('gamma value: ', gammaDecimalValue);
    console.log('epsilon value: ', gammaDecimalValue ^ 0xFFF);
    console.log('power consumption: ', gammaDecimalValue * (gammaDecimalValue ^ 0xFFF));
}

main();