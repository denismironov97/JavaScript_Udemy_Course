//Coding Challenge #1

function challengeOne() {
  //BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter);

  let weightMark = 78;
  let weightJohn = 92;

  let heightMark = 1.69;
  let heightJohn = 1.95;

  const BMIMark = calculatePersonBMIFormulaOne(weightMark, heightMark);
  const BMIJohn = calculatePersonBMIFormulaOne(weightJohn, heightJohn);

  const markHigherBMI = BMIMark > BMIJohn;

  console.log(BMIMark);
  console.log(BMIJohn);
  console.log(markHigherBMI);

  function calculatePersonBMIFormulaOne(personWeight, personHeight) {
    const personBMI = personWeight / personHeight ** 2;
    return personBMI;
  }

  function calculatePersonBMIFormulaTwo(personWeight, personHeight) {
    const personBMI = personWeight / Math.pow(personHeight, 2);
    return personBMI;
  }
}

function challengeTwo() {
  //BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter);

  let weightMark = 78;
  let weightJohn = 92;

  let heightMark = 1.69;
  let heightJohn = 1.95;

  const BMIMark = calculatePersonBMIFormulaOne(weightMark, heightMark);
  const BMIJohn = calculatePersonBMIFormulaOne(weightJohn, heightJohn);

  let stringResult;
  if (BMIMark > BMIJohn) {
    stringResult = "Mark's BMI is higher than John's!";
  } else if (BMIMark < BMIJohn) {
    stringResult = "John's BMI is higher than Mark's!";
  } else {
    stringResult = 'They both have the same BMI index.';
  }

  console.log(stringResult);

  function calculatePersonBMIFormulaOne(personWeight, personHeight) {
    const personBMI = personWeight / personHeight ** 2;
    return personBMI;
  }
}

//Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
//Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
//Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
function challengeThree(
  dolphinsScore1,
  dolphinsScore2,
  dolphinsScore3,
  koalasScore1,
  koalasScore2,
  koalasScore3
) {
  const minScoreRequirement = 100;
  const dolphinsAverage =
    (dolphinsScore1 + dolphinsScore2 + dolphinsScore3) / 3;
  const koalasAverage = (koalasScore1 + koalasScore2 + koalasScore3) / 3;

  let stringResult;
  if (
    dolphinsAverage >= minScoreRequirement ||
    koalasAverage >= minScoreRequirement
  ) {
    if (dolphinsAverage > koalasAverage) {
      stringResult = 'Dolphins win the trophy.';
    } else if (dolphinsAverage < koalasAverage) {
      stringResult = 'Koalas win the trophy.';
    } else {
      stringResult = 'Both win the trophy.';
    }
  } else {
    stringResult =
      "Both teams don't meet the min score requirement to compete.";
  }

  console.log(
    `${stringResult} Dolphins average score:${dolphinsAverage.toFixed(
      2
    )} Koalas average score${koalasAverage.toFixed(2)}`
  );
}

challengeThree(96, 108, 89, 88, 91, 110);
challengeThree(97, 112, 101, 109, 95, 123);
challengeThree(97, 112, 101, 109, 95, 106);
