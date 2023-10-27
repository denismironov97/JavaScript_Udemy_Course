'use strict';

const magicNumber = 13;
document.querySelector('.again').addEventListener('click', resetGame);
document.querySelector('.check').addEventListener('click', guessNumber);

const bodyEl = document.querySelector('body');
const inputNumberEl = document.querySelector('.guess');
const messageBoxEl = document.querySelector('.message');
const startingScore = document.querySelector('.score');
const highScore = document.querySelector('.highscore');

function resetGame(event) {}

function guessNumber(event) {
  const inputNumber = Number(inputNumberEl.value);

  if (inputNumber === magicNumber) {
    messageBoxEl.textContent =
      'Congratulations! You have guessed the magic number!';
    bodyEl.style.backgroundColor = '#60b347';

    recordHighScore(startingScore, highScore);
  } else {
    if (inputNumber > magicNumber) {
      messageBoxEl.textContent = 'Number too high!';
    } else if (inputNumber < magicNumber) {
      messageBoxEl.textContent = 'Number too low!';
    }

    startingScore.textContent = Number(startingScore.textContent) - 1;
  }

  function recordHighScore(startingScoreArg, highScoreArg) {
    if (
      Number(startingScoreArg.textContent) > Number(highScoreArg.textContent)
    ) {
      highScoreArg.textContent = startingScoreArg.textContent;
    }
  }
}

function getRandomNumber(parameters) {}
