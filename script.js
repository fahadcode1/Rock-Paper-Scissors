// Game variables
let playerScore = 0;
let computerScore = 0;

/**
 * Generate computer's random choice
 * Returns: 'rock', 'paper', or 'scissors' (all lowercase)
 */
function getComputerChoice() {
    const randomNumber = Math.random();
    
    if (randomNumber < 0.33) {
        return 'rock';
    } else if (randomNumber < 0.66) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

/**
 * Determine winner of the round
 * @param {string} playerChoice - player's choice (lowercase)
 * @param {string} computerChoice - computer's choice (lowercase)
 * @returns {string} - 'player', 'computer', or 'tie'
 */
function determineWinner(playerChoice, computerChoice) {
    // Convert to lowercase to avoid case sensitivity issues
    const player = playerChoice.toLowerCase();
    const computer = computerChoice.toLowerCase();
    
    // Check for tie first
    if (player === computer) {
        return 'tie';
    }
    
    // Check all winning conditions for player
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'player';
    }
    
    // If not tie and player doesn't win, computer wins
    return 'computer';
}

/**
 * Update the score display on the webpage
 */
function updateScore() {
    const playerScoreElement = document.getElementById('playerScore');
    const computerScoreElement = document.getElementById('computerScore');
    
    if (playerScoreElement) {
        playerScoreElement.textContent = playerScore;
    }
    if (computerScoreElement) {
        computerScoreElement.textContent = computerScore;
    }
}

/**
 * Main game function - plays one round
 * @param {string} playerChoice - the choice made by player
 */
function playGame(playerChoice) {
    // Get computer choice
    const computerChoice = getComputerChoice();
    
    // Determine winner
    const result = determineWinner(playerChoice, computerChoice);
    
    // Create display message
    let message = `You chose: ${playerChoice.toUpperCase()}<br>`;
    message += `Computer chose: ${computerChoice.toUpperCase()}<br><br>`;
    
    // Update scores and add result message
    if (result === 'tie') {
        message += "🤝 It's a TIE!";
    } else if (result === 'player') {
        playerScore++;
        message += "🎉 YOU WIN this round!";
    } else if (result === 'computer') {
        computerScore++;
        message += "🤖 COMPUTER WINS this round!";
    }
    
    // Update display
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = message;
    }
    
    // Update score display
    updateScore();
    
    // Log to console for debugging
    console.log(`Player: ${playerChoice}, Computer: ${computerChoice}, Winner: ${result}`);
}

/**
 * Reset the game to starting state
 */
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = "Choose your move!";
    }
    
    console.log("Game reset!");
}

/**
 * Test function to verify game logic works correctly
 */
function testGameLogic() {
    console.log("=== Testing Game Logic ===");
    
    // Test all possible combinations
    const choices = ['rock', 'paper', 'scissors'];
    
    choices.forEach(playerChoice => {
        choices.forEach(computerChoice => {
            const result = determineWinner(playerChoice, computerChoice);
            console.log(`${playerChoice} vs ${computerChoice} = ${result}`);
        });
    });
    
    console.log("=== Test Complete ===");
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Rock Paper Scissors Game Loaded!');
    
    // Test the logic (remove this line in production)
    testGameLogic();
    
    // Set initial display
    resetGame();
});

// Alternative manual test function you can call from browser console
function manualTest() {
    console.log("Manual testing:");
    console.log("Rock vs Scissors:", determineWinner('rock', 'scissors')); // Should be 'player'
    console.log("Paper vs Rock:", determineWinner('paper', 'rock')); // Should be 'player'  
    console.log("Scissors vs Paper:", determineWinner('scissors', 'paper')); // Should be 'player'
    console.log("Rock vs Paper:", determineWinner('rock', 'paper')); // Should be 'computer'
    console.log("Rock vs Rock:", determineWinner('rock', 'rock')); // Should be 'tie'
}