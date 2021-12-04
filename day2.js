import {parseDay2Data} from "./helpers/data-parser.js";

const COMMANDS = {
    'FORWARD': 'forward',
    'DOWN': 'down',
    'UP': 'up'
}

const position = {
    horizontal: 0,
    depth: 0,
    aim: 0
}

function moveShip(aCommand) {
    switch(aCommand.direction) {
        case COMMANDS.FORWARD:
            position.horizontal += aCommand.units;
            break;
        case COMMANDS.DOWN:
            position.depth += aCommand.units;
            break;
        case COMMANDS.UP:
            position.depth -= aCommand.units;
            break;
        default:
            break;
    }
}

function moveShipPart2(aCommand) {
    switch(aCommand.direction) {
        case COMMANDS.FORWARD: {
                position.horizontal += aCommand.units;
                position.depth += aCommand.units * position.aim;
            };
            break;
        case COMMANDS.DOWN:
            position.aim += aCommand.units;
            break;
        case COMMANDS.UP:
            position.aim -= aCommand.units;
            break;
        default:
            break;
    }
}

async function main() {
    const data = parseDay2Data();

    // data.forEach(aCommand => moveShip(aCommand));
    data.forEach(aCommand => moveShipPart2(aCommand));

    console.log('position: ', position);

    console.log('result: ', position.horizontal * position.depth);
}

main();