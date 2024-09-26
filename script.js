const cards = document.querySelectorAll('.card')
console.log(cards)

function flipCard() {
	this.classList.toggle('flip')
}

cards.forEach(card => card.addEventListener("click", flipCard))