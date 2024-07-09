// Array containing the numbers to be matched.
const numbers = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

// Arrays to keep track of flipped and matched cards.
let flippedCards = [];
let matchedCards = [];
let canFlip = true;

// Function to create a card element with given number.
function createCard(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.number = number;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    return card;
}

// Function to handle card flip.
function flipCard() {
    if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped') || matchedCards.includes(this)) {
        return;
    }
    this.classList.add('flipped');
    this.textContent = this.dataset.number;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Function to check if the two flipped cards match.
function checkMatch() {
    canFlip = false;
    setTimeout(() => {
        const [card1, card2] = flippedCards;
        if (card1.dataset.number === card2.dataset.number) {
            matchedCards.push(card1, card2);
            if (matchedCards.length === numbers.length) {
                alert('Congratulations! You won!');
                resetGame();
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?';
            card2.textContent = '?';
        }
        flippedCards = [];
        canFlip = true;
    }, 1000);
}

// Function to initialize the game.
function initGame() {
    const gameBoard = document.querySelector('.cardContainer');
    numbers.sort(() => Math.random() - 0.5);
    numbers.forEach(number => {
        const card = createCard(number);
        gameBoard.appendChild(card);
    });
}

// Function to reset the game.
function resetGame() {
    // Reset arrays
    flippedCards = [];
    matchedCards = [];

    // Clear the game board
    const gameBoard = document.querySelector('.cardContainer');
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    // Reinitialize the game
    initGame();
}

initGame();