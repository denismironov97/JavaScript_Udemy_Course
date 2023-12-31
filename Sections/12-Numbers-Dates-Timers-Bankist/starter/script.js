'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE', // de-DE pt-PT
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accTest = {
  owner: 'Just Test',
  movements: [
    5000, 3400, -150, -790, -3210, -1000, 8500, -30, 1300, 40_000, 400_000,
  ],
  interestRate: 1.5,
  pin: 123,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2023-12-15T12:01:20.894Z',
    '2023-12-12T09:01:20.894Z',
    '2023-12-13T15:01:20.894Z',
    '2023-12-14T13:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'jp-JP',
};

const accounts = [account1, account2, accTest];

/////////////////////////////////////////////////
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
// Functions

let timerInterval;
function startTimer(amountOfDurationInMs, displayElem) {
  const oneSecondInterval = 1000;

  let secondsAmount = amountOfDurationInMs / 1000;
  let secondsRemainder;
  let minutesAmount;
  let minutesRemainder;
  let hoursAmount;

  let secondsString;
  let minutesString;
  let hoursString;

  let stringTimerMessage;

  timerInterval = setInterval(() => {
    secondsRemainder = Math.trunc(secondsAmount % 60); //*

    minutesAmount = secondsAmount / 60;
    minutesRemainder = Math.trunc(minutesAmount % 60); //*

    hoursAmount = Math.trunc(minutesAmount / 60); //*

    secondsString = secondsRemainder.toString().padStart(2, '0');
    minutesString = minutesRemainder.toString().padStart(2, '0');
    hoursString = hoursAmount.toString().padStart(2, '0');

    stringTimerMessage = `${hoursString}h: ${minutesString}min: ${secondsString}sec`;

    displayElem.textContent = stringTimerMessage;

    if (secondsAmount === 0) {
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
      clearInterval(timerInterval);
    }

    secondsAmount--;
  }, oneSecondInterval);
}

const formatMovementDate = function (locale, dateObj) {
  const calcDaysPassed = (dateObj1, dateObj2) =>
    Math.round(Math.abs(dateObj1 - dateObj2) / (1000 * 60 * 60 * 24));

  const nowDate = new Date();
  const daysPassed = calcDaysPassed(dateObj, nowDate);

  let dateStrFormat;
  switch (daysPassed) {
    case 0:
      dateStrFormat = 'Today';
      break;
    case 1:
      dateStrFormat = 'Yesterday';
      break;
    case 2:
      dateStrFormat = 'Two days ago';
      break;
    case 3:
      dateStrFormat = 'Three days ago';
      break;

    default:
      /*
      const date = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      dateStrFormat = `${date}/${month}/${year}`;
      */

      const configOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      dateStrFormat = new Intl.DateTimeFormat(locale, configOptions).format(
        dateObj
      );
      // console.log(locale);
      // console.log(dateStrFormat);
      break;
  }

  return dateStrFormat;
};

const addDateToMovementOperation = function (
  dateStrFormat = new Date().toISOString(),
  currentAccount,
  receiverAcc = undefined
) {
  currentAccount.movementsDates.push(dateStrFormat);
  receiverAcc?.movementsDates.push(dateStrFormat);
};

const displayMovements = function (
  { movements, movementsDates, locale },
  sort = false
) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  const options = {
    style: 'currency',
    currency: currentAccount.currency,
  };
  const numberCurrencyFormatter = new Intl.NumberFormat(
    currentAccount.locale,
    options
  );
  //console.log(numberCurrencyFormatter);

  movs.forEach(function (currMov, index) {
    const type = currMov > 0 ? 'deposit' : 'withdrawal';

    const movFixed = numberCurrencyFormatter.format(currMov);
    // console.log(movFixed);

    const dateObj = new Date(movementsDates[index]);
    const dateStrFormat = formatMovementDate(locale, dateObj);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__date">${dateStrFormat}</div>
        <div class="movements__value">${movFixed}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatterNumberCurrency.format(acc.balance)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatterNumberCurrency.format(incomes)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatterNumberCurrency.format(Math.abs(out))}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatterNumberCurrency.format(interest)}`;
};

//IIFE
(function createUsernames(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
})(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;
//Login acc
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    //Formatting date and time using internationalization api
    const nowDate = new Date();
    const configOptions = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const dateTimeFormat = new Intl.DateTimeFormat(
      currentAccount.locale,
      configOptions
    ).format(nowDate);

    labelDate.textContent = dateTimeFormat;

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);

    //Start 5 min timer

    /*
      //Way 1
    if (timerInterval) {
      clearInterval(timerInterval);
      console.log('Cleared previous timer');
    }
    */

    //Way 2 short circuiting operators
    timerInterval && clearInterval(timerInterval);

    startTimer(5 * 60 * 1000, labelTimer);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Adding date
    const currDateStringFormat = new Date().toISOString();
    addDateToMovementOperation(
      currDateStringFormat,
      currentAccount,
      receiverAcc
    );

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    /*
    //Because it's an async function
    setTimeout(updateUI, 4000, currentAccount);

    // Add movement
    currentAccount.movements.push(amount);

    //Add date info to curr movement transaction
    const currDateStringFormat = new Date().toISOString();
    addDateToMovementOperation(currDateStringFormat, currentAccount);
    */

    //Because it's an async function
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add date info to curr movement transaction
      const currDateStringFormat = new Date().toISOString();
      addDateToMovementOperation(currDateStringFormat, currentAccount);

      // Update UI
      updateUI(currentAccount);
    }, 3000);

    /*
    // Update UI
    updateUI(currentAccount);
    */
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//Forced logged user
currentAccount = accounts.at(-1);

//Global Scoped
const formatterNumberCurrency = new Intl.NumberFormat(currentAccount.locale, {
  style: 'currency',
  currency: currentAccount.currency,
});

updateUI(currentAccount);
containerApp.style.opacity = 1;

labelWelcome.textContent = `Welcome back, ${
  currentAccount.owner.split(' ')[0]
}`;

//Formatting date and time using internationalization api
labelDate.textContent = `${new Intl.DateTimeFormat(currentAccount.locale, {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())}`;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
