// Coding Challenge #4
/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1)
//Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
dogs.forEach(
  currDog => (currDog.recommendedFood = Math.trunc(currDog.weight ** 0.75 * 28))
);

//2)
//Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
//Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
const sarahDog = dogs.find(currDog => {
  return currDog.owners.includes('Sarah');
});

//10% below of recommendedFood && 10% above recommendedFood
const isDogProperlyFed =
  sarahDog.curFood >
    sarahDog.recommendedFood - sarahDog.recommendedFood * 0.1 &&
  sarahDog.curFood < sarahDog.recommendedFood + sarahDog.recommendedFood * 0.1;

//Basically, the current portion should be between 90% and 110% of the recommended portion.
//current > (recommended * 0.90) && current < (recommended * 1.10)
const isDogFedCorrectly =
  sarahDog.curFood > sarahDog.recommendedFood * 0.9 &&
  sarahDog.curFood < sarahDog.recommendedFood * 1.1;

const message = isDogFedCorrectly
  ? `Sarah's dog is properly fed.`
  : `Sarah needs to feed her dog properly!`;

//console.log(message);

//3)
const fatDogs = dogs.filter(
  currDog => currDog.curFood > currDog.recommendedFood * 1.1
);

const scrawnyDogs = dogs.filter(
  currDog => currDog.curFood < currDog.recommendedFood * 0.9
);

const { overfedDogs, underfedDogs } = dogs.reduce(
  (accObjStruct, currDog) => {
    if (currDog.curFood < currDog.recommendedFood * 0.9) {
      accObjStruct.underfedDogs.push(currDog);
    }

    if (currDog.curFood > currDog.recommendedFood * 1.1) {
      accObjStruct.overfedDogs.push(currDog);
    }

    return accObjStruct;
  },
  { overfedDogs: [], underfedDogs: [] }
);

/*
console.log('Overfed dogs:');
console.log(fatDogs);

console.log('-'.padEnd(40, '-'));

console.log('Underfed dogs:');
console.log(scrawnyDogs);

console.log('-'.padEnd(40, '-'));

console.log('Overfed dogs:');
console.log(overfedDogs);

console.log('-'.padEnd(40, '-'));

console.log('Underfed dogs:');
console.log(underfedDogs);
*/

//3.1)
dogs.forEach(determineHowDogIsFed);

function determineHowDogIsFed(currDog) {
  let fedStatus;
  if (currDog.curFood < currDog.recommendedFood * 0.9) {
    fedStatus = 'underfed';
  } else if (currDog.curFood > currDog.recommendedFood * 1.1) {
    fedStatus = 'overfed';
  } else {
    fedStatus = 'correctly fed';
  }

  currDog.fedStatus = fedStatus;
}

//console.log(dogs);

//3.2)
const ownersEatTooMuch = overfedDogs.flatMap(currDog => currDog.owners);
const ownersEatTooLittle = underfedDogs.flatMap(currDog => currDog.owners);
//console.log(`Overfed dog's owners: ${ownersEatTooMuch.join(', ')}`);
//console.log(`Underfed dog's owners: ${ownersEatTooLittle.join(', ')}`);

//4)
const strOverfedDogOwners = `${ownersEatTooMuch.join(', ')} dogs eat too much!`;
const strUnderfedDogOwners = `${ownersEatTooLittle.join(
  ', '
)} dogs eat too little!`;

//console.log(strOverfedDogOwners);
//console.log(strUnderfedDogOwners);

//5)
const isThereExactlyFedDog = dogs.some(
  currDog => currDog.curFood === currDog.recommendedFood
);

//console.log(isThereExactlyFedDog);

//6)
const isThereOkFedDog = dogs.some(isDogFedOkay);

function isDogFedOkay(currDog) {
  return (
    currDog.curFood > currDog.recommendedFood * 0.9 &&
    currDog.curFood < currDog.recommendedFood * 1.1
  );
}

//console.log(isThereOkFedDog);

//7)
const okayFedDogs = dogs.filter(isDogFedOkay);
//console.log(okayFedDogs);

//8)
/*
const sortedDogsByRecFoodAscending = dogs.slice().sort((currDogA, currDogB) => {
  return currDogA.recommendedFood - currDogB.recommendedFood;
});
*/

const sortedDogsByRecFoodAsc = dogs.slice().sort(function (currDogA, currDogB) {
  return customComparator(currDogA.recommendedFood, currDogB.recommendedFood);
});

function customComparator(a, b) {
  if (a > b) {
    return 1;
  } else {
    return -1;
  }
}

sortedDogsByRecFoodAsc.forEach(currDog => {
  console.log(currDog);
  console.log(currDog.recommendedFood);
});
