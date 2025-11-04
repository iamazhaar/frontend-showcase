// Getting the scoreCard from localStorage
let scoreCard = JSON.parse(localStorage.getItem('scoreCard'));

// If scoreCard in localStorage doesn't exists -> null. So,
if (!scoreCard) {
    scoreCard = {
        win: 0,
        lose: 0,
        tie: 0
    };
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove;

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }

    return computerMove;
}


function playGame(playerMove) {
    const computerMove = pickComputerMove();

    // Comparisons
    let result;
    if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie';
        } else if (computerMove === 'Paper') {
            result = 'You Lose';
        } else if (computerMove === 'Scissors') {
            result = 'You Won';
        }

    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You Won';
        } else if (computerMove === 'Paper') {
            result = 'Tie';
        } else if (computerMove === 'Scissors') {
            result = 'You Lose';
        }

    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You Lose';
        } else if (computerMove === 'Paper') {
            result = 'You Won';
        } else if (computerMove === 'Scissors') {
            result = 'Tie';
        }
    }

    // Updating the scoreCard
    if (result === 'You Won') {
        scoreCard.win++;
    } else if (result === 'You Lose') {
        scoreCard.lose++;
    } else if (result === 'Tie') {
        scoreCard.tie++;
    }

    // Setting the scoreCard in localStorage
    localStorage.setItem('scoreCard', JSON.stringify(scoreCard));

    // After the result got set
    document.querySelector('.js-result').innerHTML = `Result: ${result}`;
    document.querySelector('.js-moves')
        .innerHTML = `Your Move: <img src="./images/${playerMove.toLowerCase()}-emoji.png" class="move-icon">, Computer's Move: <img src="./images/${computerMove.toLowerCase()}-emoji.png" class="move-icon">`;
    displayUpdateScore();
}


// Removing the scores from the properties & localStorage
function resetScoreCard() {
    scoreCard.win = 0;
    scoreCard.lose = 0;
    scoreCard.tie = 0;
    localStorage.removeItem('scoreCard');
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
    displayUpdateScore();
}


// For displaying the score on webpage
function displayUpdateScore() {
    document.querySelector('.js-score')
        .innerHTML = `Win: ${scoreCard.win}, Lose: ${scoreCard.lose}, Tie: ${scoreCard.tie}`;
}

displayUpdateScore();
