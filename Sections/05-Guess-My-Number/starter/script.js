'use strict';

const magicNumber = 13;
document.querySelector('.again').addEventListener('click', resetGame);
document.querySelector('.check').addEventListener('click', guessNumber);

const bodyEl = document.querySelector('body');
const inputNumberEl = document.querySelector('.guess');
const messageBoxEl = document.querySelector('.message');
const startingScore = document.querySelector('.score');
const highScore = document.querySelector('.highscore');

function resetGame(event) {
  resetInputNumber(inputNumberEl);
  startingScore.textContent = 20;
  messageBoxEl.textContent = 'Start guessing...';
  bodyEl.style.backgroundColor = '#222';
}

function guessNumber(event) {
  const inputNumber = Number(inputNumberEl.value);

  if (checkForIncorrectInput(inputNumber)) {
    messageBoxEl.textContent = 'Choose number between 1 and 20!';
    resetInputNumber(inputNumberEl);
    return;
  }

  console.log(typeof inputNumber);
  console.log(inputNumber);

  if (inputNumber === magicNumber) {
    messageBoxEl.textContent = '🎉 Correct Number!';
    bodyEl.style.backgroundColor = '#60b347';

    recordHighScore(startingScore, highScore);
  } else {
    if (inputNumber > magicNumber) {
      messageBoxEl.textContent = '📈 Too high!';
    } else if (inputNumber < magicNumber) {
      messageBoxEl.textContent = '📉 Too low!';
    }

    startingScore.textContent = Number(startingScore.textContent) - 1;
  }

  resetInputNumber(inputNumberEl);

  function recordHighScore(startingScoreArg, highScoreArg) {
    if (
      Number(startingScoreArg.textContent) > Number(highScoreArg.textContent)
    ) {
      highScoreArg.textContent = startingScoreArg.textContent;
    }
  }

  function checkForIncorrectInput(inputNumberArg) {
    return inputNumberArg <= 0 || inputNumberArg > 20;
  }
}

function resetInputNumber(inputNumberArg) {
  inputNumberArg.value = '';
}

function getRandomNumber(parameters) {}
