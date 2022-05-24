/*----- constants -----*/
const PLAYER1_MARK = 'red';
const PLAYER2_MARK = 'blue';
const WINNING_ARRAY = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 5, 9],
	[3, 5, 7],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
];

/*----- app's state (variables) -----*/
let currentPlayer;
const player1Boxes = [];
const player2Boxes = [];
const player1Score = 0;
const player2Sore = 0;

/*----- cached element references -----*/
const mainEl = document.querySelector('main');
const resetBtnEl = document.querySelector('.reset');
const playerEl = document.querySelector('#js-player');
const playBtnEl = document.querySelector('#js-play-btn');
const welcomeModalEL = document.querySelector('.modal-welcome');
const boxes = document.querySelectorAll('.box');

/*----- event listeners -----*/
playBtnEl.addEventListener('click', init);
mainEl.addEventListener('click', changeGrid);
resetBtnEl.addEventListener('click', init);

/*----- functions -----*/
function init() {
	// Hide modal and show game screen
	welcomeModalEL.classList.add('hide');
	currentPlayer = 1;
	playerEl.innerText = currentPlayer;
	player1Boxes.length = 0;
	player2Boxes.length = 0;
	boxes.forEach(function (box) {
		box.style.backgroundColor = 'lightgrey';
	});
}

function changeGrid(element) {
	const box = element.target;
	if (box.classList.contains('box')) {
		const boxId = parseInt(box.id);
		//Check if box is already selected
		if (player1Boxes.includes(boxId) || player2Boxes.includes(boxId)) {
			alert('Please pick a different box.');
		} else if (currentPlayer === 1) {
			player1Boxes.push(boxId);
			checkForWinner();
			box.style.backgroundColor = PLAYER1_MARK;
			currentPlayer = 2;
			playerEl.innerText = currentPlayer;
		} else {
			player2Boxes.push(boxId);
			checkForWinner();
			box.style.backgroundColor = PLAYER2_MARK;
			currentPlayer = 1;
			playerEl.innerText = currentPlayer;
		}
	}
}

function checkForWinner() {
	let playerBoxes;
	if (currentPlayer === 1) {
		playerBoxes = player1Boxes;
	} else {
		playerBoxes = player2Boxes;
	}
	// Check each winning combo in WINNING_ARRAY and see if combo exists in player's saved boxes.
	// Found at https://bobbyhadz.com/blog/javascript-check-if-array-contains-all-elements-another-array
	for (let i = 0; i < WINNING_ARRAY.length; i++) {
		const containsAll = WINNING_ARRAY[i].every((element) => {
			return playerBoxes.includes(element);
		});
		if (containsAll === true) {
			return true;
		}
	}
	return false;
}
