const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultElement = document.getElementById('result');
const playerNameInput = document.getElementById('player-name');
const playerDisplayNameElement = document.getElementById('player-display-name');
const playerTagElement = document.getElementById('player-tag');
const playerSetupElement = document.getElementById('player-setup');
const gameContentElement = document.getElementById('game-content');
const choicesElement = document.getElementById('choices');

let playerScore = 0;
let computerScore = 0;

const MAX_POINTS = 3;

function computerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerMove) {
    if (userChoice === computerMove) {
        resultElement.textContent = "It's a draw!";
    } else if (
        (userChoice === 'rock' && computerMove === 'scissors') ||
        (userChoice === 'paper' && computerMove === 'rock') ||
        (userChoice === 'scissors' && computerMove === 'paper')
    ) {
        playerScore++;
        resultElement.textContent = "You win!";
    } else {
        computerScore++;
        resultElement.textContent = "You lose!";
    }

    updateScores();

    if (playerScore === MAX_POINTS || computerScore === MAX_POINTS) {
        endGame();
    }
}

function updateScores() {
    const playerName = playerNameInput.value || 'Player';
    const playerScoreText = `${playerName}: ${playerScore}`;
    const computerScoreText = `Computer: ${computerScore}`;
    playerScoreElement.textContent = playerScoreText;
    computerScoreElement.textContent = computerScoreText;
    updatePlayerTag(playerName);
}

function updatePlayerTag(playerName) {
    playerTagElement.textContent = `Name: ${playerName}`;
}

function startGame() {
    const playerName = playerNameInput.value;
    if (playerName) {
        playerDisplayNameElement.textContent = playerName;
        playerSetupElement.style.display = 'none';
        gameContentElement.style.display = 'block';
        choicesElement.style.display = 'flex';
        resetScores(); 
    } else {
        alert('Please enter your name to start the game.');
    }
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    updateScores();
}

function endGame() {
    const winner = playerScore === MAX_POINTS ? 'You' : 'Computer';
    alert(`${winner} won the game!`);
    resetScores();
    playerSetupElement.style.display = 'block';
    gameContentElement.style.display = 'none';
    choicesElement.style.display = 'none';
}
choicesElement.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'button') {
        const userChoice = event.target.id;
        if (playerScore < MAX_POINTS && computerScore < MAX_POINTS) {
            const computerMove = computerChoice();
            determineWinner(userChoice, computerMove);
        }
    }
});

