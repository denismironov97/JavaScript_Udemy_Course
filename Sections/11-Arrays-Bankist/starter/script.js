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

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
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

displayMovements(movements);

//IIFE example
(function createUsernames(accountsDataArr) {
  const regex = /[A-Z]/g;
  accountsDataArr.forEach(function (acc) {
    const ownerInitials = acc.owner.match(regex).join('').toLowerCase();
    acc.username = ownerInitials;
  });
})(accounts);

//Deposits

const deposits = movements.filter(function (currMovementValue) {
  return currMovementValue > 0;
});

const withdrawals = movements.filter(currValue => currValue < 0);

console.log(deposits);
console.log(withdrawals);
