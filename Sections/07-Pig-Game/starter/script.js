'use strict';

const diceImgEl = document.querySelector('img[class="dice"]');
const newGameBtnEl = document.querySelector('.btn--new');
const rollDiceBtnEl = document.querySelector('.btn--roll');
const holdBtnEl = document.querySelector('.btn--hold');

const player1SectionEl = document.querySelector('.player--0');
const player2SectionEl = document.querySelector('.player--1');

const player1TotalScoreEl = document.querySelector('#score--0');
const player2TotalScoreEl = document.querySelector('#score--1');

const player1CurrentScoreEl = document.querySelector('#current--0');
const player2CurrentScoreEl = document.querySelector('#current--1');

const regExPattern = new RegExp(/dice-\d.png/gm);

const maxPoints = 100;
let boolFlag = true;

// Initial dice render before the start of the game
hideDiceRender();

rollDiceBtnEl.addEventListener('click', playerRollDice);

holdBtnEl.addEventListener('click', holdPlayerMove);

newGameBtnEl.addEventListener('click', resetDiceGame);

function playerRollDice() {
  if (boolFlag) {
    boolFlag = false;
    showDiceRender();
  }

  const playerSection = determinePlayerMove(player1SectionEl, player2SectionEl);
  let playerCurrScore;

  // Player 1
  if (playerSection === player1SectionEl) {
    playerCurrScore = player1CurrentScoreEl;
  } else {
    // Player 2
    playerCurrScore = player2CurrentScoreEl;
  }

  const diceNumber = throwDice();

  changeDiceDisplayRender(diceNumber);

  if (diceNumber !== 1) {
    playerCurrScore.textContent =
      Number(playerCurrScore.textContent) + diceNumber;
  } else {
    playerCurrScore.textContent = 0;
    changePlayerActivePosition(player1SectionEl, player2SectionEl);
  }

  if (Number(playerCurrScore.textContent) >= maxPoints) {
    playerCurrScore.textContent = 100;
    playerWinsGame(playerSection);
  }
}

function holdPlayerMove() {
  const playerSection = determinePlayerMove(player1SectionEl, player2SectionEl);
  let playerCurrScore;
  let totalPlayerScore;

  // Player 1
  if (playerSection === player1SectionEl) {
    playerCurrScore = player1CurrentScoreEl;
    totalPlayerScore = player1TotalScoreEl;
  } else {
    // Player 2
    playerCurrScore = player2CurrentScoreEl;
    totalPlayerScore = player2TotalScoreEl;
  }

  totalPlayerScore.textContent =
    Number(totalPlayerScore.textContent) + Number(playerCurrScore.textContent);

  playerCurrScore.textContent = 0;

  if (Number(totalPlayerScore.textContent) >= maxPoints) {
    totalPlayerScore.textContent = 100;
    playerWinsGame(playerSection);
    return;
  }

  changePlayerActivePosition(player1SectionEl, player2SectionEl);
}

function determinePlayerMove(player1SectionArg, player2SectionArg) {
  const player1Move = player1SectionArg.classList.contains('player--active');
  const player2Move = player2SectionArg.classList.contains('player--active');

  if (player1Move) {
    return player1SectionArg;
  }

  if (player2Move) {
    return player2SectionArg;
  }
}

function changeDiceDisplayRender(diceNumberArg) {
  const imgFullSourcePath = diceImgEl.src;
  const matchedStringDicePath = imgFullSourcePath.match(regExPattern)[0];
  const baseImgPath = imgFullSourcePath.split(matchedStringDicePath)[0];
  const newEndDicePath = `dice-${diceNumberArg}.png`;

  diceImgEl.src = baseImgPath + newEndDicePath;
}

function changePlayerActivePosition(player1SectionArg, player2SectionArg) {
  player1SectionArg.classList.toggle('player--active');
  player2SectionArg.classList.toggle('player--active');
}

function throwDice() {
  return Math.trunc(Math.random() * 6) + 1;
}

function playerWinsGame(playerSectionArg) {
  playerSectionArg.classList.add('player--winner');
  rollDiceBtnEl.disabled = true;
  holdBtnEl.disabled = true;
}

function resetDiceGame() {
  player1TotalScoreEl.textContent = 0;
  player2TotalScoreEl.textContent = 0;

  player1CurrentScoreEl.textContent = 0;
  player2CurrentScoreEl.textContent = 0;

  rollDiceBtnEl.disabled = false;
  holdBtnEl.disabled = false;

  if (player2SectionEl.classList.contains('player--active')) {
    changePlayerActivePosition(player1SectionEl, player2SectionEl);
  }

  if (player1SectionEl.classList.contains('player--winner')) {
    player1SectionEl.classList.remove('player--winner');
  } else if (player2SectionEl.classList.contains('player--winner')) {
    player2SectionEl.classList.remove('player--winner');
  }

  boolFlag = true;
  hideDiceRender();
}

function hideDiceRender() {
  diceImgEl.style.display = 'none';
}

function showDiceRender() {
  diceImgEl.style.display = 'block';
}
