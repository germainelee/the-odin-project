let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let selectedChoice = null;
let isGameOver = false;

// Get DOM elements
const choiceBtns = document.querySelectorAll('.choice-btn');
const roundCounter = document.getElementById('roundInfo');
const choicesDisplay = document.getElementById('choices')
const roundResultText = document.getElementById('roundResult')
const scoreMessage = document.getElementById('score');
const finalResultText = document.getElementById('finalResult');
const restartBtn = document.getElementById('newGameBtn')

// Setup audio elements
const buttonClickSound = new Howl({
    src: ['./click-sound-effect.mp3']
});

window.onload = function () {
    // not working
    // const musicAudio = new HTMLUnknownElement({
    //     src: ['./BlippyTrance.mp3'],
    //     autoplay: true,
    //     loop: true,
    // })

    // musicAudio.play();
}

// choices object to store both names and emojis
const emojiChoices = {
    rockBtn: { name: 'rock', emoji: '✊' },
    paperBtn: { name: 'paper', emoji: '✋' },
    scissorsBtn: { name: 'scissors', emoji: '✌' }
};

function updateScoreDisplay() {
    // update score display
    scoreMessage.innerHTML = `Score - You: ${playerScore} Computer: ${computerScore}`;
}

function getComputerChoice() {
    const random = Math.random();
    // Return the complete choice object
    if (random < 0.33) {
        return emojiChoices.rockBtn;
    } else if (random < 0.66) {
        return emojiChoices.paperBtn;
    } else {
        return emojiChoices.scissorsBtn;
    }
}

function getPlayerChoice(choice) {
    if (isGameOver) return null;

    // Validate the choice
    if (choice === 'rock' || choice === 'paper' || choice === 'scissors') {
        // Remove selected class from all buttons
        choiceBtns.forEach(btn => btn.classList.remove('selected'));
        // Add selected class to clicked button
        document.getElementById(`${choice}Btn`).classList.add('selected');

        selectedChoice = choice;
        return choice;
    }
    else {
        //     document.getElementById('error').textContent = 'Please select Rock, Paper, or Scissors';
        return null;
    }
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice.name === computerChoice.name) {
        return "It's a tie!";
    }

    else if (
        (playerChoice.name === 'rock' && computerChoice.name === 'scissors') ||
        (playerChoice.name === 'paper' && computerChoice.name === 'rock') ||
        (playerChoice.name === 'scissors' && computerChoice.name === 'paper')
    ) {
        playerScore++;
        return 'You win this round!';
    }

    else {
        computerScore++;
        return 'Computer wins this round!';
    }
}

function determineWinner() {
    if (playerScore >= 5 || computerScore >= 5) {
        isGameOver = true;
        const winner = playerScore >= 5 ? "🎉 Congratulations! You've" : "Computer has";
        finalResultText.textContent = `${winner} won the game!`;
        roundResultText.innerHTML = 'THE END.\nThank you for playing.';

        // Disable game buttons and show new game button
        choiceBtns.forEach(btn => btn.disabled = true);
        restartBtn.style.display = 'inline-block';
    }
}

function playGame(event) {
    const buttonId = event.currentTarget.id;
    const playerSelection = emojiChoices[buttonId];

    if (playerSelection) {
        buttonClickSound.play();

        const computerSelection = getComputerChoice();
        const roundResult = playRound(playerSelection, computerSelection);

        choicesDisplay.innerHTML =
            `You chose ${playerSelection.emoji} ${playerSelection.name}<br/>` +
            `Computer chose ${computerSelection.emoji} ${computerSelection.name}`;
        roundResultText.innerHTML = roundResult;
        updateScoreDisplay();

        currentRound++;
        roundCounter.textContent = `Number of rounds: ${currentRound}`;

        determineWinner();
    }
}

function resetGame() {
    // Reset scores and round
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    selectedChoice = null;
    isGameOver = false;

    // Reset UI
    roundCounter.textContent = `Number of rounds: ${currentRound}`;
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
    // button.addEventListener('click', (e) => {
    //     const choice = e.target.closest('.choice-btn').id.replace('Btn', '').toLowerCase();
    //     playGame(choice);
    // });

    button.addEventListener('click', playGame);
});

restartBtn.addEventListener('click', resetGame);

// Initialize score display when page loads
updateScoreDisplay();
