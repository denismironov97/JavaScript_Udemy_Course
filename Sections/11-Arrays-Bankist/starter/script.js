'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accountTest = {
  owner: 'Just Test',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 99999],
  interestRate: 1,
  pin: 123,
};

const accounts = [account1, account2, account3, account4, accountTest];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const transferFormElem = document.querySelector('.form--transfer');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////

//--------------------------------------------------------------------------------------------
let loggedUSer;

const updateUI = function (currAccount) {
  displayMovements(currAccount);
  calcDisplaySummary(currAccount);
  displayCurrentBalance(currAccount);
};

btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  const [userInputEl, passwordInputEl] = [
    ...event.target.parentElement.children,
  ];

  loggedUSer = accounts.find(
    acc =>
      acc.username === userInputEl.value &&
      acc.pin === Number(passwordInputEl.value)
  );

  if (loggedUSer) {
    containerApp.style.opacity = 1;
    updateUI(loggedUSer);
    displayWelcomeMessage();
  }

  userInputEl.value = passwordInputEl.value = '';

  //Remove focus on element after login
  passwordInputEl.blur();
});

const transferMoney = function (event) {
  event.preventDefault();

  const formData = new FormData(transferFormElem);
  let [usernameToTransfer, transferAmount] = [...formData.values()];
  transferAmount = Number(transferAmount);

  const transferAccount = accounts.find(accObj => {
    return accObj.username === usernameToTransfer;
  });

  let errFlag = false;
  //Check if user is trying to send amount to him/her-self
  if (loggedUSer.username === usernameToTransfer) {
    errFlag = true;
    alert('Cannot transfer money to yourself!');
  }
  //Check if user is trying to send amount to nonexistent user
  else if (!transferAccount) {
    errFlag = true;
    alert('No such account exists.');
  }
  //Check if user is trying to send negative amount
  else if (transferAmount <= 0) {
    errFlag = true;
    alert('Transfer amount must be a positive value or diff from 0.');
  }
  //Check if user is trying to send amount more than his/hers balance
  else if (transferAmount > loggedUSer.balance) {
    errFlag = true;
    alert('Transfer amount must less than current balance.');
  }

  if (errFlag) {
    return transferFormElem.reset();
  }

  loggedUSer.movements.push(transferAmount * -1);
  transferAccount.movements.push(transferAmount);

  updateUI(loggedUSer);

  transferFormElem.reset();
};
btnTransfer.addEventListener('click', transferMoney);

const displayWelcomeMessage = function () {
  labelWelcome.textContent = `Welcome ${loggedUSer.owner}.`;
};

const displayMovements = function ({ movements }) {
  [...containerMovements.children].forEach(value => value.remove());

  movements.forEach((currValue, currIndex) => {
    const movementRowEl = createMovementRow(
      currValue,
      currIndex,
      'placeholder date'
    );
    containerMovements.prepend(movementRowEl);
  });

  function createMovementRow(value, index, date) {
    const typeOperation = value > 0 ? 'deposit' : 'withdrawal';
    const typeOperationEl = document.createElement('div');
    typeOperationEl.textContent = `${index + 1} ${typeOperation}`;
    typeOperationEl.classList.add(
      `movements__type--${typeOperation}`,
      'movements__type'
    );

    const movementsDateEl = document.createElement('div');
    movementsDateEl.textContent = date;
    movementsDateEl.classList.add('movements__date');

    const movementsValueEl = document.createElement('div');
    movementsValueEl.textContent = `${value}€`;
    movementsValueEl.classList.add('movements__value');

    const movementRowEl = document.createElement('div');
    movementRowEl.classList.add('movements__row');

    movementRowEl.append(typeOperationEl, movementsDateEl, movementsValueEl);

    return movementRowEl;
  }
};
//displayMovements(movements);

//IIFE example
(function createUsernames(accountsDataArr) {
  const regex = /[A-Z]/g;
  accountsDataArr.forEach(function (acc) {
    const ownerInitials = acc.owner.match(regex).join('').toLowerCase();
    acc.username = ownerInitials;
  });
})(accounts);

const calcDisplaySummary = function ({ movements, interestRate }) {
  const totalDeposits = movements
    .filter(currMovementValue => currMovementValue > 0)
    .reduce((acc, currValue) => {
      return acc + currValue;
    }, 0);

  labelSumIn.textContent = `${totalDeposits}€`;

  const totalWithdraws = movements
    .filter(currMovementValue => currMovementValue < 0)
    .reduce((acc, currValue) => {
      return acc + currValue;
    }, 0);

  labelSumOut.textContent = `${Math.abs(totalWithdraws)}€`;

  const totalInterest = movements
    .filter(currVal => currVal > 0)
    .map(currVal => {
      return (currVal * interestRate) / 100;
    })
    .filter(currVal => currVal >= 1)
    .reduce((acc, currValue) => {
      return acc + currValue;
    }, 0);

  labelSumInterest.textContent = `${totalInterest.toFixed(2)}€`;
};
//calcDisplaySummary(movements);

const displayCurrentBalance = function (useAccObj) {
  const totalBalance = useAccObj.movements.reduce(function (acc, currValue) {
    return acc + currValue;
  });

  useAccObj.balance = totalBalance;

  labelBalance.textContent = `${totalBalance}€`;
};

//Array methods
/*------------------------------------------------------------------------------*/
//Deposits
const deposits = movements.filter(function (currMovementValue) {
  return currMovementValue > 0;
});

const withdrawals = movements.filter(currValue => currValue < 0);

//Reduce Method Example
/*------------------------------------------------------------------------------*/
const customReducerCallbackFn = function (
  accumulator,
  currValue,
  currIndex,
  arrReference
) {
  return accumulator + currValue;
};

//const totalUserBalance = movements.reduce(customReducerCallbackFn, 0);
/*------------------------------------------------------------------------------*/
/* 
const displayUserBalance = function (totalBalance, labelBalanceElem) {
  labelBalanceElem.textContent = `${totalBalance}€`;
};
displayUserBalance(totalUserBalance, labelBalance);
*/

const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(currMovementValue => currMovementValue > 0)
  .map(currValue => currValue * eurToUsd)
  .reduce((acc, currValue) => acc + currValue, 0);
