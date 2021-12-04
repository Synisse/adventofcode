import {parseDay4Data} from './helpers/data-parser.js';
import _ from 'lodash';

const BINGOBOARD_SIZE = 5;

function getCleanBingoBoard() {
	return Array(BINGOBOARD_SIZE).fill(0).map(() => Array(BINGOBOARD_SIZE).fill(0));
}

function mapBingoData(aData) {
	let bingoBoards = [];
	let currentBingoBoard = [];
	let addedBingoRows = 0;

	aData.forEach((aBingoRow) => {
		if (aBingoRow === '') {
			if (!_.isEqual(currentBingoBoard, [])) {
				bingoBoards.push({winner: false, board: currentBingoBoard});
			}

			currentBingoBoard = getCleanBingoBoard();
			addedBingoRows = 0;
		} else {
			aBingoRow.split(' ').filter((aValue) => aValue !== '').forEach((aBingoValue, aIndex) => {
					currentBingoBoard[addedBingoRows][aIndex] = parseInt(aBingoValue, 10);
				});

			addedBingoRows++;
		}
	});

	return bingoBoards;
}

function playBingo(aBingoSet, aNumber) {
    return _.map(aBingoSet, aBingoSetItem => {
        return {winner: aBingoSetItem.winner, board: _.chunk(_.flatten(aBingoSetItem.board).map(aVal => aVal === aNumber ? -1 : aVal), 5)}
    });
}

function checkIfBoardWonGame(aBingoSet) {
    _.forEach(aBingoSet, aBingoSetItem => {
        let columnValue = Array(BINGOBOARD_SIZE).fill(0);

        _.forEach(aBingoSetItem.board, (aBingoItem) => {
            _.forEach(aBingoItem, (aValue, aInnerIndex) => columnValue[aInnerIndex] += aValue)

            if((_.sum(aBingoItem) === -5) || _.includes(columnValue, -5)) {
                aBingoSetItem.winner = true;
            }
        })
    });

    return _.find(aBingoSet, aItem => aItem.winner);
}

async function main() {
	const data = parseDay4Data();
    let winnerBoard;
    let lastDraw = 0;

	let drawValues = data[0].split(',').map((aValue) => parseInt(aValue, 10));
	data.shift();

	let bingoData = mapBingoData(data);

	drawValues.some((aDrawValue) => {
        if(_.isNil(winnerBoard)) {
            bingoData = playBingo(bingoData, aDrawValue);

            winnerBoard = checkIfBoardWonGame(bingoData);
            lastDraw = aDrawValue;
        }

        return !_.isNil(winnerBoard);
	});

    console.log('lastDraw is: ', lastDraw);
    console.log('first winnerBoard is: ', winnerBoard);
    console.log('sum: ', _.sum(_.pullAll(_.flatten(winnerBoard.board), [-1])));
    console.log('calc: ', _.sum(_.pullAll(_.flatten(winnerBoard.board), [-1])) * lastDraw);

    bingoData = mapBingoData(data);
    let winnerBoards = [];

	drawValues.forEach((aDrawValue) => {
        bingoData = playBingo(bingoData, aDrawValue);

        winnerBoard = checkIfBoardWonGame(bingoData);
        lastDraw = aDrawValue;

        let winnerBoardsOfThisRound = _.map(_.filter(bingoData, aBingoDataItem => aBingoDataItem.winner), aWinnerboard => { return {draw: lastDraw, boardObject: aWinnerboard}});
        _.remove(bingoData, aBingoDataItem => aBingoDataItem.winner);
        winnerBoards.push(...winnerBoardsOfThisRound);
	});

    console.log('lastDraw is: ', winnerBoards[winnerBoards.length - 1].draw);
    console.log('last winnerBoard is: ', winnerBoards[winnerBoards.length - 1].boardObject);
    console.log('sum: ', _.sum(_.pullAll(_.flatten(winnerBoards[winnerBoards.length - 1].boardObject.board), [-1])));
    console.log('calc: ', _.sum(_.pullAll(_.flatten(winnerBoards[winnerBoards.length - 1].boardObject.board), [-1])) * winnerBoards[winnerBoards.length - 1].draw);
}

main();
