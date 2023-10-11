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

challengeOne();
