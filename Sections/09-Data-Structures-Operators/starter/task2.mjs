/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

'use strict';

import { game } from './utils.mjs';

const gameDeepCopy = structuredClone(game);

//1)
const stringBuilder = [];
for (const [index, player] of gameDeepCopy.scored.entries()) {
  stringBuilder.push(`Goal ${index + 1}: ${player}\n`);
}

//console.log(stringBuilder.join(''));

//2)
const { odds } = gameDeepCopy;

const oddValues = Object.values(odds);
let oddsAcum = 0;
for (const oddValue of oddValues) {
  oddsAcum += oddValue;
}

const roundToSecondDecimalValue = numberToRound =>
  Math.round(numberToRound * 100) / 100;

const averageOddValue = roundToSecondDecimalValue(oddsAcum / oddValues.length);

//console.log(averageOddValue);

//3)
const tupleArr = Object.entries(gameDeepCopy.odds);

const strB = [];
for (const [key, value] of tupleArr) {
  const teamString = gameDeepCopy[key] || 'draw';
  strB.push(`Odd of victory for ${teamString}: ${value}\n`);
}

//console.log(strB.join(''));

//4*)
const scores = {};

/*
for (const player of gameDeepCopy.scored) {
  if (scores.hasOwnProperty(player)) {
    scores[player]++;
  } else {
    scores[player] = 1;
  }
}
*/

for (const player of gameDeepCopy.scored) {
  scores[player] ? scores[player]++ : (scores[player] = 1);
}

console.log(scores);
