const cards = document.querySelectorAll('.card');
const scoreBlock = document.querySelector('.current-score')
const turnBlock = document.querySelector('.current-turn')


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



(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();


cards.forEach(card => card.addEventListener("click", flipCard));