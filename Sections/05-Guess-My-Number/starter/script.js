'use strict';

let magicNumber = getRandomNumber();
let previousAnswersArr = [];

const bodyEl = document.querySelector('body');
const magicDivBox = document.querySelector('.number');
const inputNumberEl = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const messageBoxEl = document.querySelector('.message');
const startingScore = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const previousAnswerEl = document.querySelector('.previous-answers');

document.querySelector('.again').addEventListener('click', resetGame);
checkBtn.addEventListener('click', guessNumber);

console.log(`Magic number is ${magicNumber}.`);

function resetGame() {
  startingScore.textContent = 20;
  magicDivBox.textContent = '?';
  messageBoxEl.textContent = 'Start guessing...';
  checkBtn.disabled = false;
  inputNumberEl.disabled = false;
  bodyEl.style.backgroundColor = '#222';

  resetInputNumber(inputNumberEl);
  previousAnswerEl.textContent = '';
  magicNumber = getRandomNumber();

  console.log(`Magic number is ${magicNumber}.`);
}

function guessNumber() {
  const inputNumber = Number(inputNumberEl.value);

  if (checkForIncorrectInput(inputNumber)) {
    messageBoxEl.textContent = 'Choose number between 1 and 20!';
    resetInputNumber(inputNumberEl);
    return;
  }

  previousAnswersArr.push(inputNumber);

  previousAnswerEl.textContent = getLastThreeGivenAnswers(previousAnswersArr);

  if (inputNumber === magicNumber) {
    playerHasWonGame();
    recordHighScore(startingScore, highScore);
  } else {
    startingScore.textContent = Number(startingScore.textContent) - 1;

    if (Number(startingScore.textContent) <= 0) {
      playerHasDepletedHisPoints();
      return;
    }

    if (inputNumber > magicNumber) {
      messageBoxEl.textContent = '📈 Too high!';
    } else if (inputNumber < magicNumber) {
      messageBoxEl.textContent = '📉 Too low!';
    }
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

  function playerHasWonGame() {
    messageBoxEl.textContent = '🎉 Correct Number! Play again.';
    magicDivBox.textContent = magicNumber;
    bodyEl.style.backgroundColor = '#60b347';
    disablePlayerButtons();
  }

  function playerHasDepletedHisPoints() {
    messageBoxEl.textContent = '💥 Game over! Try again.';
    bodyEl.style.backgroundColor = '#f87171';

    disablePlayerButtons();
    resetInputNumber(inputNumberEl);
  }

  function disablePlayerButtons() {
    checkBtn.disabled = true;
    inputNumberEl.disabled = true;
  }
}

function resetInputNumber(inputNumberArg) {
  inputNumberArg.value = '';
}

function getRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function getLastThreeGivenAnswers(dataArr) {
  let lastThreeAnswers = [];

  if (dataArr.length <= 3) {
    for (let i = 0; i < dataArr.length; i++) {
      lastThreeAnswers.push(dataArr[i]);
    }
  } else {
    lastThreeAnswers = dataArr.slice(dataArr.length - 3);
  }

  return lastThreeAnswers.join(', ');
}
