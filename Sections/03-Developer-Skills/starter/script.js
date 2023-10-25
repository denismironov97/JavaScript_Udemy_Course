'use strict';
// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this:
//"Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

//Array.prototype.concat()

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperaturesOther = [
  33,
  -2,
  -6,
  -1,
  'error',
  9,
  13,
  1,
  5,
  14,
  9,
  7,
  'error',
  25,
];

const tempsAmplitude = getTempAmplitude(temperatures);

const mergedResultArr = mergeArrays(
  getTempAmplitude(temperatures),
  getTempAmplitude(temperaturesOther)
);

//console.log(mergedResultArr);

function getTempAmplitude(tempsArr) {
  let minTemp = Number.MAX_SAFE_INTEGER;
  let maxTemp = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < tempsArr.length; i++) {
    if (typeof tempsArr[i] !== 'number') {
      continue;
    }

    if (tempsArr[i] > maxTemp) {
      maxTemp = tempsArr[i];
    }

    if (tempsArr[i] < minTemp) {
      minTemp = tempsArr[i];
    }
  }

  return [minTemp, maxTemp];
}

function mergeArrays(arr1, arr2) {
  return arr1.concat(arr2);
}

// Coding Challenge #1
/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

let forecasted1 = printForecast([17, 21, 23]);
let forecasted2 = printForecast([12, 5, -5, 0, 4]);

console.log(forecasted1);
console.log(forecasted2);

function printForecast(dataArr) {
  let stringValue = '';
  for (let i = 0; i < dataArr.length; i++) {
    stringValue += `...${dataArr[i]}ºC in ${i + 1} days `;
  }

  return stringValue.trimEnd();
}
