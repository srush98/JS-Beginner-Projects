// Select DOM elements
const input = document.getElementById('guess');
const btn = document.getElementById('btn');
const wrong = document.querySelector('.wrong');
const guesses = document.getElementById('guesses');

// Initialize game settings
let difficultySetting = 'Easy';
let maxAttempts = 10;
let answer = Math.floor(Math.random() * 100) + 1;
let noGuesses = 0;

// Event listeners
btn.addEventListener('click', guessNumber);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        guessNumber();
    }
});

// Function to handle difficulty changes
function setDifficulty(level) {
    difficultySetting = level;
    maxAttempts = level === 'Easy' ? 10 : level === 'Medium' ? 7 : 5;
    resetGame(); // Reset game state whenever difficulty changes
}

// Main guessing logic
function guessNumber() {
    if (noGuesses >= maxAttempts) {
        alert(`Sorry, you didn't guess the number within ${maxAttempts} attempts.`);
        resetGame();
        return;
    }

    const guess = parseInt(input.value, 10); // Parse input to integer
    if (isNaN(guess) || guess < 1 || guess > 100) {
        wrong.textContent = "Enter a number between 1 to 100.";
    } else {
        noGuesses++;
        updateGuessCount();
        if (guess > answer) {
            wrong.textContent = "You guessed too high.";
        } else if (guess < answer) {
            wrong.textContent = "You guessed too low.";
        } else {
            wrong.textContent = "Congratulations You guessed the correct number.";
            disableButton(true);
            setTimeout(resetGame, 10000); // Reset game after 10 seconds
        }
    }
}

// Update guess count
function updateGuessCount() {
    guesses.textContent = `No. of guesses: ${noGuesses}`;
}

// Disable button
function disableButton(disable) {
    btn.disabled = disable;
}

// Reset game state
function resetGame() {
    noGuesses = 0;
    answer = Math.floor(Math.random() * (difficultySetting === 'Easy' ? 100 : difficultySetting === 'Medium' ? 50 : 30)) + 1;
    input.value = "";
    wrong.textContent = "";
    disableButton(false);
    updateGuessCount();
}