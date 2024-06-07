/*
const budgetList = [
  { priceValue: 250, description: 'Sold old TV 📺', currentUser: 'jonas' },
  { priceValue: -45, description: 'Groceries 🥑', currentUser: 'jonas' },
  { priceValue: 3500, description: 'Monthly salary 👩‍💻', currentUser: 'jonas' },
  { priceValue: 300, description: 'Freelancing 👩‍💻', currentUser: 'jonas' },
  { priceValue: -1100, description: 'New iPhone 📱', currentUser: 'jonas' },
  { priceValue: -20, description: 'Candy 🍭', currentUser: 'matilda' },
  { priceValue: -125, description: 'Toys 🚂', currentUser: 'matilda' },
  { priceValue: -1800, description: 'New Laptop 💻', currentUser: 'jonas' },
];

const budgetLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = user => {
  return spendingLimits?.[user] ?? 0;
};

const addPurchase = function (priceValue, description, currentUser) {
  //short circuiting + optional chaining
  currentUser = currentUser?.toLowerCase() || 'jonas';

  //const currLimit = budgetLimits[currentUser] ?? 0;
  const currLimit = getLimit(currentUser);

  if (priceValue <= currLimit) {
    const userPurchaseData = {
      priceValue: -priceValue,
      description,
      currentUser,
    };

    budgetList.push(userPurchaseData);
  }
};

//addPurchase(10, 'Pizza 🍕');
//addPurchase(100, 'Going to movies 🍿', 'Matilda');
//addPurchase(200, 'Stuff', 'Jay');

//console.log(budgetList);

const checkExpense = function () {
  for (const entry of budgetList) {
    if (entry.priceValue < -getLimit(entry.currentUser)) {
      entry.flag = 'limit reached';
    }
  }
};

//checkExpense();
//console.log(budgetList);

const logBigExpenses = function (limit) {
  let output = '';
  for (const entry of budgetList) {
    if (entry.priceValue <= -limit) {
      output += `${entry.description.slice(-2)} / `; //Emojis are 2 chars
    }
  }

  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

logBigExpenses(500);
*/

'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 200;

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function :D
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// const checkExpenses2 = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure function
const logBigExpenses = function (currState, bigLimit) {
  const bigExpenses = currState
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);
};

console.log('Logging big expenses:');
logBigExpenses(finalBudget, 400);
