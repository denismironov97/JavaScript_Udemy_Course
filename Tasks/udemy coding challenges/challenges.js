'use strict';

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

//challengeThree(96, 108, 89, 88, 91, 110);
//challengeThree(97, 112, 101, 109, 95, 123);
//challengeThree(97, 112, 101, 109, 95, 106);

//Data 1: Test for bill values 275, 40 and 430
function challengeFour(billValue) {
  let tip =
    billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;
  let total = billValue + tip;
  let stringResult = `The bill was ${billValue.toFixed(
    2
  )}, the tip was ${tip.toFixed(2)}, and the total value ${total.toFixed(2)}`;

  console.log(stringResult);
}

//challengeFour(275);
//challengeFour(40);
//challengeFour(430);

function challengeFive() {
  const calcAverage = (scoreParam1, scoreParam2, scoreParam3) => {
    return (scoreParam1 + scoreParam2 + scoreParam3) / 3;
  };

  const checkWinner = function (averageKoalas, averageDolphins) {
    let stringMessage = 'No winners this race.';

    if (averageKoalas >= averageDolphins * 2) {
      stringMessage = `Koalas win (${averageKoalas} vs. ${averageDolphins})`;
    } else if (averageDolphins >= averageKoalas * 2) {
      stringMessage = `Dolphins win (${averageDolphins} vs. ${averageKoalas})`;
    }

    return stringMessage;
  };

  const averageKoalas = calcAverage(23, 34, 27);
  const averageDolphins = calcAverage(85, 54, 41);
  console.log(checkWinner(averageKoalas, averageDolphins));
}
//challengeFive();

//Test data: 125, 555 and 44
function challengeSix() {
  const totalTipValue = calcTip([125, 555, 44]);

  console.log(totalTipValue.toFixed(2));

  function calcTip(billsArr) {
    const tipsArr = billsArr.map((bill) => {
      const tipValue = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;
      return tipValue;
    });

    let totalTipValue = 0;
    tipsArr.forEach((tip) => (totalTipValue = totalTipValue + tip));

    return totalTipValue;
  }
}
//challengeSix();

function challengeSeven() {
  const mark = {
    firstName: 'Mark',
    lastName: 'Miller',
    weight: 78,
    height: 1.69,

    calcBMI() {
      const personBMI = this.weight / this.height ** 2;
      this.pBMI = personBMI;
      return this.pBMI;
    },
  };

  const john = {
    firstName: 'John',
    lastName: 'Smith',
    weight: 92,
    height: 1.95,

    calcBMI: function () {
      const personBMI = this.weight / this.height ** 2;
      this.pBMI = personBMI;
      return this.pBMI;
    },
  };

  console.log(mark.calcBMI());
  console.log(john.calcBMI());

  console.log(mark.pBMI);
  console.log(john.pBMI);

  console.log(declareBMIWinner(john, mark));

  function declareBMIWinner(person1, person2) {
    let higherBMIPerson;
    let lowerBMIPerson;

    if (person1.pBMI > person2.pBMI) {
      higherBMIPerson = person1;
      lowerBMIPerson = person2;
    } else if (person1.pBMI < person2.pBMI) {
      higherBMIPerson = person2;
      lowerBMIPerson = person1;
    } else {
      return 'Both people have the same BMI!';
    }

    return `${higherBMIPerson.firstName}'s BMI (${higherBMIPerson.pBMI.toFixed(
      2
    )}) is higher than ${
      lowerBMIPerson.firstName
    }'s (${lowerBMIPerson.pBMI.toFixed(2)})!`;
  }
}
challengeSeven();
