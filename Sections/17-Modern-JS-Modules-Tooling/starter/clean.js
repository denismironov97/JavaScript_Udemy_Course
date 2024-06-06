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
