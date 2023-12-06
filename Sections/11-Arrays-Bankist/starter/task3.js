/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function calcAverageHumanAge(dogYearsArr) {
  const average = dogYearsArr
    .map(currDogYears =>
      currDogYears <= 2 ? currDogYears * 2 : 16 + currDogYears * 4
    )
    .filter(currHumanYears => currHumanYears >= 18)
    .reduce((acc, currAdult, _, arrRef) => {
      return acc + currAdult / arrRef.length;
    }, 0);

  return Math.round(average);
}

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
