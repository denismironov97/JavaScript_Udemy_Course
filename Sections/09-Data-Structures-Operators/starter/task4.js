/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

//1)
const testDataText = `
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure
`;

const camelCaseStrArr = testDataText
  .trim()
  .split('\n')
  .map(x => {
    const individualStr = x.trim().toLowerCase();
    const subStrOne = individualStr.slice(0, individualStr.indexOf('_'));
    const subStrTwo = individualStr.slice(individualStr.indexOf('_') + 1);

    const camelCasedStr = subStrTwo.replace(
      subStrTwo[0],
      subStrTwo[0].toUpperCase()
    );

    return subStrOne.concat(camelCasedStr);
  });

const checkMark = '✅';
const strBuilder = [];
for (let i = 0; i < camelCaseStrArr.length; i++) {
  strBuilder.push(
    camelCaseStrArr[i] +
      checkMark.repeat(i + 1).padStart(21 - camelCaseStrArr[i].length + i)
  );
}

const strMessage = strBuilder.join('\n');
console.log('underscoreCase      ✅'.length);
console.log(strMessage);
