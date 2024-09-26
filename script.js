const cards = document.querySelectorAll('.card');
const scoreBlock = document.querySelector('.current-score');
const turnBlock = document.querySelector('.current-turn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalScoreBlock = document.querySelector('.modal-score');
const modalTurnsBlock = document.querySelector('.modal-turns');
const historyList = document.querySelector('.gamesLogs-ul');
const newGameButton = document.querySelector('.modal_newgame-btn');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let currentScore = 0;
let currentTurn = 0;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if(!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;
	

	checkForMatch();
}


function changeCurrentScore() {
	scoreBlock.innerHTML = `${currentScore}`;
};

function changeCurrentTurn() {
	currentTurn = currentTurn + 1;
	turnBlock.innerHTML = `${currentTurn}`;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.type === secondCard.dataset.type;

    if (isMatch) {
        disableCards(); // Викликаємо, якщо картки співпали
		changeCurrentTurn();
		currentScore = currentScore + 10;
		changeCurrentScore()
		checkEndOfGame()
    } else {
        unflipCards(); // Викликаємо, якщо картки не співпали
		changeCurrentTurn();
		currentScore = currentScore - 2;
		changeCurrentScore();
    }
}



function disableCards () {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard()
}



function unflipCards() {
	lockBoard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip')
		secondCard.classList.remove('flip')

		resetBoard()
	}, 1000);
}



function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}



function checkEndOfGame() {
	const allFlipped = document.querySelectorAll('.card.flip');
	if (allFlipped.length === cards.length) {
		endGame();
	}
}

function saveGameResult() {


	let history = JSON.parse(localStorage.getItem('gameHistory')) || [];

	const gameResult = {
		score: currentScore,
		turns: currentTurn,
		date: new Date().toLocaleString()
	};

	history.push(gameResult);

	if (history.length > 10) {
        history.shift();
    }

	localStorage.setItem('gameHistory', JSON.stringify(history));
}


function displayGameHistory() {
	historyList.innerHTML = '';
	
	const history = JSON.parse(localStorage.getItem('gameHistory')) || [];

	history.forEach(game => {
		const li = document.createElement('li');
		li.classList.add('gameLogs-li');
		li.textContent = `Date: ${game.date}, Score: ${game.score}, Turns: ${game.turns}`;
		historyList.appendChild(li);
	})
}

function showModal() {
	modalScoreBlock.innerHTML = `${currentScore}`;
	modalTurnsBlock.innerHTML = `${currentTurn}`;
	overlay.style.display = 'block';
	modal.style.display = 'block';
}
function closeModal() {
	overlay.style.display = 'none';
	modal.style.display = 'none';
}

// function startNewGame() {
// 	currentScore = 0;
// 	currentTurn = 0;
// 	changeCurrentScore();
// 	changeCurrentTurn();

// 	   cards.forEach(card => {
//         card.classList.remove('flip');
//         card.addEventListener("click", flipCard); 
//     });

// 	resetBoard();

// 	shuffle();

// 	displayGameHistory();

// 	closeModal();
// }


function endGame() {
	saveGameResult();
	displayGameHistory();
	showModal();
	newGameButton.addEventListener('click', () => {
    location.reload(); 
});
	
}



(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();


displayGameHistory();



cards.forEach(card => card.addEventListener("click", flipCard));