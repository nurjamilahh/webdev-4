/**
 * ===================================
 * RevoFun: Number Guessing Game Logic
 * Author: Nur Jamilah
 * Version: 1.0.0 (Production Ready)
 * ===================================
 */

function initNumberGuessingGame() {
    // --- 1. ELEMENT SELECTORS ---
    const setupSection = document.getElementById('nickname-setup');
    const instructionSection = document.getElementById('guess-instructions');
    const gameDisplay = document.getElementById('game-display');
    const gameOverSection = document.getElementById('guess-game-over');

    const nicknameInput = document.getElementById('nickname-input');
    const currentPlayerName = document.getElementById('current-player-name');
    const guessInput = document.getElementById('guess-input');

    const startArenaBtn = document.getElementById('start-guess-btn');
    const startRoundBtn = document.getElementById('start-round-btn');
    const submitGuessBtn = document.getElementById('guess-submit-btn');
    const playAgainBtn = document.getElementById('play-again-guess-btn');

    const guessMessage = document.getElementById('guess-message');
    const attemptsSpan = document.getElementById('guess-attempts');
    const finalScoreMsg = document.getElementById('final-score-message');
    const guessForm = document.getElementById('guess-form');

    // --- 2. GAME STATE ---
    let state = {
        secretNumber: 0,
        attemptsLeft: 5,
        history: [],
        playerName: ""
    };

    // --- 3. CORE GAME FLOW ---

    /**
     * Step 1: Entry Arena
     * Captures player nickname and moves to instructions.
     */
    startArenaBtn.addEventListener('click', () => {
        const name = nicknameInput.value.trim();
        if (name === "") {
            alert("Please enter your Genius Name first!");
            return;
        }
        state.playerName = name;
        currentPlayerName.textContent = name;
        
        setupSection.classList.add('hidden');
        instructionSection.classList.remove('hidden');
    });

    /**
     * Step 2: Instruction Transition
     * Hides instructions and initializes the actual game area.
     */
    startRoundBtn.addEventListener('click', () => {
        instructionSection.classList.add('hidden');
        gameDisplay.classList.remove('hidden');
        resetGameState();
    });

    /**
     * Step 3: Main Guessing Logic
     * Processes user input, updates history, and checks for Win/Loss.
     */
    guessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userGuess = parseInt(guessInput.value);

        // Input Validation
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            guessMessage.textContent = "Warning: Number must be between 1 - 100!";
            return;
        }

        // Update State
        state.history.push(userGuess);
        state.attemptsLeft--;
        attemptsSpan.textContent = state.attemptsLeft;

        // Check Result
        if (userGuess === state.secretNumber) {
            endGame(true);
        } else if (state.attemptsLeft <= 0) {
            endGame(false);
        } else {
            const hint = userGuess < state.secretNumber ? "TOO LOW" : "TOO HIGH";
            guessMessage.textContent = `${userGuess} is ${hint}! Try again.`;
            guessInput.value = "";
            guessInput.focus();
        }
    });

    /**
     * Step 4: Play Again / Reset
     * Returns the user to the game screen from the Game Over screen.
     */
    playAgainBtn.addEventListener('click', () => {
        gameOverSection.classList.add('hidden');
        gameDisplay.classList.remove('hidden');
        resetGameState();
    });

    // --- 4. HELPER FUNCTIONS ---

    /**
     * Resets the game state variables and UI elements for a new round.
     */
    function resetGameState() {
        state.secretNumber = Math.floor(Math.random() * 100) + 1;
        state.attemptsLeft = 5;
        state.history = [];
        
        attemptsSpan.textContent = state.attemptsLeft;
        guessMessage.textContent = "Good Luck! Start guessing...";
        guessMessage.className = "message-box mt-4";
        guessInput.value = "";
        guessInput.disabled = false;
        submitGuessBtn.disabled = false;
    }

    /**
     * Displays the final result screen with icons and player history.
     * @param {boolean} isWin - Determines the visual theme of the result.
     */
    function endGame(isWin) {
        gameDisplay.classList.add('hidden');
        gameOverSection.classList.remove('hidden');

        const historyStr = state.history.join(", ");
        const resultTitle = document.getElementById('result-title');

        if (isWin) {
            resultTitle.innerHTML = `<i class="fas fa-crown" style="color: #f1c40f;"></i> YOU WIN!`;
            finalScoreMsg.innerHTML = `
                <i class="fas fa-thumbs-up" style="color: #28a745;"></i> 
                Amazing <strong>${state.playerName}</strong>! The number was indeed ${state.secretNumber}. <br> 
                <small style="display: block; margin-top: 10px;">
                    <i class="fas fa-history"></i> Your History: [${historyStr}]
                </small>
            `;
            gameOverSection.className = "message-box winner";
        } else {
            resultTitle.innerHTML = `<i class="fas fa-skull-crossbones"></i> GAME OVER`;
            finalScoreMsg.innerHTML = `
                <i class="fas fa-heart-broken" style="color: #dc3545;"></i> 
                Sorry <strong>${state.playerName}</strong>, the correct number was ${state.secretNumber}. <br> 
                <small style="display: block; margin-top: 10px;">
                    <i class="fas fa-history"></i> Your attempts: [${historyStr}]
                </small>
            `;
            gameOverSection.className = "message-box loser";
        }

        // Apply Refresh icon to button
        playAgainBtn.innerHTML = `<i class="fas fa-redo-alt"></i> Play Again`;
    }
}

/**
 * --- INITIALIZATION ---
 * Ensures the game logic only runs after the full DOM is loaded.
 */
window.addEventListener('load', initNumberGuessingGame);