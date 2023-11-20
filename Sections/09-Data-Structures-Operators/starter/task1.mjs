/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

'use strict';
import { game } from './utils.mjs';

const gameSCopy = Object.assign({}, game); //game shallow copy

//1)
const [players1, players2] = gameSCopy.players;

//console.log(players1);
//console.log(players2);

//2)
const [goalkeeperTeam1, ...fieldPlayersTeam1] = players1;
const [goalkeeperTeam2, ...fieldPlayersTeam2] = players2;

/*
console.log(goalkeeperTeam1);
console.log(fieldPlayersTeam1);
console.log(goalkeeperTeam2);
console.log(fieldPlayersTeam2);
*/

//3)
const allPlayers = [...players1, ...players2];

//console.log(allPlayers);

//4)
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
//console.log(players1Final);

//5)
//Nested object destructuring
const {
  odds: { team1: team1Odds, team2: team2Odds, x: draw },
} = gameSCopy;

//console.log(team1Odds, team2Odds, draw);

//6)
function printGoals(...footballPlayers) {
  console.log(footballPlayers);
  console.log(`${footballPlayers.length} goals were scored.`);
}

/*
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller', 'Lewandowski');
printGoals('Davies', 'Muller');
printGoals('Muller');
*/

printGoals(...gameSCopy.scored);

//7)
const { team1, team2 } = gameSCopy;
team1Odds > team2Odds && console.log(`${team1} is winner.`);
team1Odds < team2Odds && console.log(`${team2} is winner.`);
