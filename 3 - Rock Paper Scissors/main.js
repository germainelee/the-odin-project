let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
const TOTAL_ROUNDS = 5;

// Get DOM elements
const choiceBtns = document.querySelectorAll('.choice-btn');
const roundCounter = document.getElementById('roundInfo')
const choicesDisplay = document.getElementById('choices')
const roundResultText = document.getElementById('roundResult')
const scoreMessage = document.getElementById('score');
const finalResultText = document.getElementById('finalResult');
const restartBtn = document.getElementById('newGameBtn')

const choices = {
    rockBtn: { name: 'rock', emoji: '✊' },
    paperBtn: { name: 'paper', emoji: '✋' },
    scissorsBtn: { name: 'scissors', emoji: '✌' }
};

function updateScoreDisplay() {
    scoreMessage.innerHTML = `Score - You: ${playerScore} Computer: ${computerScore}`;
}

function getComputerChoice() {
    const random = Math.random();
    if (random < 0.33) {
        return choices.rockBtn;
    } else if (random < 0.66) {
        return choices.paperBtn;
    } else {
        return choices.scissorsBtn;
    }
}

function getPlayerChoice(choice) {
    // Validate the choice
    if (choice === 'rock' || choice === 'paper' || choice === 'scissors') {
        // Remove selected class from all buttons
        document.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Add selected class to clicked button
        document.getElementById(`${choice}Btn`).classList.add('selected');

        return choice;
    }
    else {
    //     document.getElementById('error').textContent = 'Please select Rock, Paper, or Scissors';
        return null;
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        return 'You win!';
    }

    computerScore++;
    return 'Computer wins!';

}

function determineWinner() {
    if (playerScore > computerScore) {
        return "🎉 Congratulations! You've won the game!";
    } else if (computerScore > playerScore) {
        return "The computer has won the game.";
    } else {
        return "It's a tie game!";
    }
}

function playGame(event) {
    if (currentRound > TOTAL_ROUNDS) return;

    const buttonId = event.currentTarget.id;
    const playerSelection = choices[buttonId];
    // if (!playerSelection) return;
    const computerSelection = getComputerChoice();
    
    // Remove selected class from all buttons
    choiceBtns.forEach(btn=>btn.classList.remove('selected'));
    // Add selected class to clicked button
    event.currentTarget.classList.add('selected');

    const roundResult = playRound(playerSelection, computerSelection);

    choicesDisplay.innerHTML = `You chose ${playerSelection.emoji} ${playerSelection.name.toUpperCase()} <br/>Computer chose ${computerSelection.emoji} ${computerSelection.name.toUpperCase()}`;
    roundResultText.innerHTML = roundResult;
    updateScoreDisplay();

    currentRound++;

    if (currentRound <= TOTAL_ROUNDS) {
        roundCounter.textContent = `Round ${currentRound} of ${TOTAL_ROUNDS} `;
    } else {
        const gameResult = determineWinner();
        finalResultText.textContent = gameResult;
        roundResultText.innerHTML = 'THE END.\nThank you for playing.';
        
        // Disable game buttons and show new game button
        choiceBtns.forEach(btn => {
            btn.disabled = true;
        });
        restartBtn.style.display = 'inline-block';
    }
}

function resetGame() {
    // Reset scores and round
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;

    // Reset UI
    roundCounter.textContent = `Round ${currentRound} of ${TOTAL_ROUNDS} `;
    choicesDisplay.innerHTML = '';
    roundResultText.innerHTML = '';
    updateScoreDisplay();
    finalResultText.textContent = '';

    choiceBtns.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('selected');
    });

    // hide newGameBtn
    restartBtn.style.display = 'none';
}

// Add event listeners
choiceBtns.forEach(button => {
    button.addEventListener('click', playGame);
});

restartBtn.addEventListener('click', resetGame);

// Initialize score display when page loads
updateScoreDisplay();
