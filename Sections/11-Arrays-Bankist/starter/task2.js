/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function calcAverageHumanAge(dogAgesArr) {
  /*
  const youngerDogs = dogAgesArr.filter(function (currDogAge) {
    return currDogAge <= 2;
  });
  const seniorDogs = dogAgesArr.filter(currDogAge => currDogAge > 2);
  */
  /*
  const youngerDogs = dogAgesArr.filter(determineSeniorityOfDogs);
  const seniorDogs = dogAgesArr.filter(determineSeniorityOfDogs);

  const convertedToHumanYearsYoungsters = youngerDogs.map(
    currDogAge => currDogAge * 2
  );
  const convertedToHumanYearsSeniors = seniorDogs.map(
    currDogAge => 16 + currDogAge * 4
  );
  */

  const convertedToHumanYears = dogAgesArr.map(function (currDogYears) {
    const humanYears =
      currDogYears <= 2 ? currDogYears * 2 : 16 + currDogYears * 4;
    return humanYears;
  });

  const adults = convertedToHumanYears.filter(currHumanYears => {
    return currHumanYears >= 18;
  });

  /*
  const averageAge =
    adults.reduce(function (acc, currValue) {
      return acc + currValue;
    }, 0) / adults.length;
    */

  //Another way of calculating average
  //2, 3 => (2+3)/2 = 2.5 || 2/2 + 3/2 = 2.5 ===>(2+3)/2 === 2/2 + 3/2
  const average = adults.reduce(function (acc, currValue, _, arrRef) {
    return acc + currValue / arrRef.length;
  }, 0);

  return Math.round(average);

  function determineSeniorityOfDogs(currDogAge) {
    if (currDogAge <= 2) {
      return currDogAge;
    } else {
      return currDogAge;
    }
  }
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
