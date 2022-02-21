class Player {
	constructor(symbol) {
		this.moves = [];
		this.symbol = symbol;
	}
	addMove(moveArray) {
		this.moves = [...this.moves, moveArray];
	}
	reset() {
		this.moves = [];
	}
}

var canvas = document.getElementById('board');

if (canvas.getContext) {
	var ctx = canvas.getContext('2d');
} else {
	console.error('Incompatible');
}

/** Draw tic tac toe board
 * [0,0]    [0,1]   [0,2]
 * [1,0]    [1,1]   [1,2]
 * [2,0]    [2,1]   [2,2]
 */

// Row values
const rowMinX = 0.5;
const rowMaxX = 300.5;
const rowHeightMinY = 100.5;
const rowHeightMaxY = 200.5;

// Column values
const colMinX = 100.5;
const colMaxX = 200.5;
const colHeightMinY = 0;
const colHeightMaxY = 300;

const draw = () => {
	// canvas
	canvas.width = canvas.height = 300;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = '50px helvetica';
	ctx.lineWidth = 2;
	ctx.beginPath();
	// Row borders
	ctx.moveTo(rowMinX, rowHeightMaxY);
	ctx.lineTo(rowMaxX, rowHeightMaxY);
	ctx.moveTo(rowMinX, rowHeightMinY);
	ctx.lineTo(rowMaxX, rowHeightMinY);
	// Column borders.
	ctx.moveTo(colMinX, colHeightMinY);
	ctx.lineTo(colMinX, colHeightMaxY);
	ctx.moveTo(colMaxX, colHeightMinY);
	ctx.lineTo(colMaxX, colHeightMaxY);
	ctx.stroke();
	ctx.closePath();
};

// If the position being selected already has a symbol, pos# should be true and cannot place symbol.
const occupiedPositions = {
	pos1: false,
	pos2: false,
	pos3: false,
	pos4: false,
	pos5: false,
	pos6: false,
	pos7: false,
	pos8: false,
	pos9: false,
};
// Conditions where cursor clicked
const cursorPosition = (offsetX, offsetY, symbol) => {
	let currentSymbol = symbol;
	const firstColumnXCenter = rowMaxX / 3 / 2;
	const thirdRowYCenter = 250;

	if (
		offsetX > rowMinX &&
		offsetX < rowHeightMinY &&
		offsetY > colMaxX &&
		!occupiedPositions.pos3
	) {
		// [2,0]
		console.log('[2,0]');
		ctx.fillText(currentSymbol, firstColumnXCenter, thirdRowYCenter);
		occupiedPositions.pos3 = true;
		return [2, 0];
	} else if (
		offsetX > rowMinX &&
		offsetX < rowHeightMinY &&
		offsetY < colMaxX &&
		offsetY > colMinX &&
		!occupiedPositions.pos2
	) {
		// [1,0]
		console.log('[1,0]');
		ctx.fillText(currentSymbol, firstColumnXCenter, thirdRowYCenter - 100);
		occupiedPositions.pos2 = true;
		return [1, 0];
	} else if (
		offsetX > rowMinX &&
		offsetX < rowHeightMinY &&
		offsetY < colMinX &&
		!occupiedPositions.pos1
	) {
		//[0,0]
		console.log('[0,0]');
		ctx.fillText(currentSymbol, firstColumnXCenter, thirdRowYCenter - 200);
		occupiedPositions.pos1 = true;
		return [0, 0];
	} else if (
		offsetX > rowHeightMinY &&
		offsetX < rowHeightMaxY &&
		offsetY > colMaxX &&
		!occupiedPositions.pos6
	) {
		// [2,1]
		console.log('[2,1]');
		ctx.fillText(currentSymbol, firstColumnXCenter + 100, thirdRowYCenter);
		occupiedPositions.pos6 = true;
		return [2, 1];
	} else if (
		offsetX > rowHeightMinY &&
		offsetX < rowHeightMaxY &&
		offsetY > colMinX &&
		offsetY < colMaxX &&
		!occupiedPositions.pos5
	) {
		// [1,1] Center
		console.log('[1,1]');
		ctx.fillText(currentSymbol, rowMaxX / 2, thirdRowYCenter - 100);
		occupiedPositions.pos5 = true;
		return [1, 1];
	} else if (
		offsetX > rowHeightMinY &&
		offsetX < rowHeightMaxY &&
		offsetY < colMaxX &&
		!occupiedPositions.pos4
	) {
		// [0,1]
		console.log('[0,1]');
		ctx.fillText(currentSymbol, rowMaxX / 2, thirdRowYCenter - 200);
		occupiedPositions.pos4 = true;
		return [0, 1];
	} else if (
		offsetX > rowHeightMaxY &&
		offsetX < rowMaxX &&
		offsetY > colMaxX &&
		!occupiedPositions.pos9
	) {
		// [2,2]
		console.log('[2,2]');
		ctx.fillText(currentSymbol, 250, thirdRowYCenter);
		occupiedPositions.pos9 = true;
		return [2, 2];
	} else if (
		offsetX > rowHeightMaxY &&
		offsetX < rowMaxX &&
		offsetY < colMaxX &&
		offsetY > colMinX &&
		!occupiedPositions.pos8
	) {
		// [1,2]
		console.log('[1,2]');
		ctx.fillText(currentSymbol, 250, 150);
		occupiedPositions.pos8 = true;
		return [1, 2];
	} else if (
		offsetX > rowHeightMaxY &&
		offsetX < rowMaxX &&
		offsetY < colMaxX &&
		!occupiedPositions.pos7
	) {
		// [0,2]
		console.log('[0,2]');
		ctx.fillText(currentSymbol, 250, 50);
		occupiedPositions.pos7 = true;
		return [0, 2];
	} else {
		return null;
	}
};

// Resets the board.
const resetBoard = () => {
	for (var key in occupiedPositions) {
		if (occupiedPositions.hasOwnProperty(key)) {
			occupiedPositions[key] = false;
		}
	}
	draw();
};

// Conditions if board should reset.
const fullBoard = (resetPlayer) => {
	const { pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9 } =
		occupiedPositions;
	if (
		pos1 === true &&
		pos2 === true &&
		pos3 === true &&
		pos4 === true &&
		pos5 === true &&
		pos6 === true &&
		pos7 === true &&
		pos8 === true &&
		pos9 === true
	) {
		alert("It's a tie!");
		resetPlayer();
		resetBoard();
	} else {
		return;
	}
};

// Check most recent move if win
const isWinningMove = (moveArray) => {
	const gameWinning = [
		[
			[0, 0],
			[0, 1],
			[0, 2],
		], // First row
		[
			[1, 0],
			[1, 1],
			[1, 2],
		], // Second row
		[
			[2, 0],
			[2, 1],
			[2, 2],
		], // Third row
		[
			[0, 0],
			[1, 0],
			[2, 0],
		], // First column
		[
			[0, 1],
			[1, 1],
			[2, 1],
		], // Second column
		[
			[0, 2],
			[1, 2],
			[2, 2],
		], // Third column
		[
			[0, 0],
			[1, 1],
			[2, 2],
		], // Top right to bottom Left
		[
			[0, 2],
			[1, 1],
			[2, 0],
		], // Top left to  bottom right
	];
	let winner = false;
	for (let i = 0; i < gameWinning.length; i++) {
		const [a, b, c] = gameWinning[i];
		let j = 0;
		let aMatch = false;
		let bMatch = false;
		let cMatch = false;

		while (!winner) {
			if (aMatch && bMatch && cMatch) {
				console.log('You won!');
				winner = true;
			}
			if (j < moveArray.length) {
				if (moveArray[j][0] === a[0] && moveArray[j][1] === a[1] && !aMatch) {
					aMatch = true;
				} else if (
					moveArray[j][0] === b[0] &&
					moveArray[j][1] === b[1] &&
					!bMatch
				) {
					bMatch = true;
				} else if (
					moveArray[j][0] === c[0] &&
					moveArray[j][1] === c[1] &&
					!cMatch
				) {
					cMatch = true;
				}
			} else {
				break;
			}
			j++;
		}
	}

	return winner;
	// draw()
};

const game = () => {
	const player1 = new Player('X');
	const player2 = new Player('O');

	let currentPlayer1 = true;

	const resetPlayers = () => {
		currentPlayer1 = true;
		player1.reset();
		player2.reset();
	};

	// Add listener / cursor.
	canvas.addEventListener('click', async ({ offsetX, offsetY }) => {
		console.log(`X: ${offsetX} Y: ${offsetY}`);

		let symbol;
		currentPlayer1 ? (symbol = player1.symbol) : (symbol = player2.symbol);

		const pos = cursorPosition(offsetX, offsetY, symbol);

		if (!pos) {
			return;
		}

		currentPlayer1 ? player1.addMove(pos) : player2.addMove(pos);
		const winner = currentPlayer1
			? isWinningMove(player1.moves)
			: isWinningMove(player2.moves);

		if (winner) {
			currentPlayer1
				? alert(`${player1.symbol} won!`)
				: alert(`${player2.symbol} won!`);

			resetPlayers();

			resetBoard();
		} else {
			currentPlayer1 = !currentPlayer1;
		}
		fullBoard(() => resetPlayers());
	});
};

const main = () => {
	draw();
	game();
};

main();
