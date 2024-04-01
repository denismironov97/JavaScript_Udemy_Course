'use strict';

///////////////////////////////////////
// The Event Loop in Practice
//console.log('Test start');
/*
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1_0000_000_000; i++) {}
  console.log(res);
});
*/
//console.log('Test end');

///////////////////////////////////////
// Building a Simple Promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening!');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN the lottery!');
    } else {
      reject(new Error('You lost your money!'));
    }
  }, 2000);
});

lotteryPromise
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err));
*/

/*
const promiseExecutor = function (resolvedState, rejectedState) {
  console.log(
    'Executor fn executes as soon as Promise obj is created through the Promise c-tor'
  );

  const randomNum = Math.random();

  const timerHandler = function () {
    // random num, resolvedState-fn, rejectedState-fn are accessed thanks through closure
    if (randomNum >= 0.5) {
      resolvedState('1: Resolved');
    } else {
      rejectedState('0: Rejected');
    }
  };

  setTimeout(timerHandler, 2000);
};
const lotteryPromise = new Promise(promiseExecutor);
lotteryPromise
  .then(resultValue => console.log(resultValue))
  .catch(errValue => console.log(errValue));
*/

//Promisify-ing callback based operations, wrapper training

console.log('Execution begins');

/*
const timeoutPromiseFn = function (seconds) {
  const promiseWrapper = new Promise(function executor(resolve, reject) {
    setTimeout(function () {
      resolve(`Waited for ${seconds}.`);
    }, seconds * 1000);
  });

  return promiseWrapper;
};

timeoutPromiseFn(3)
  .then(function (result) {
    console.log(result);

    return timeoutPromiseFn(5);
  })
  .then(result => {
    console.log(result);

    return timeoutPromiseFn(1);
  })
  .then(result => console.log(result));

*/

const geolocationPromisifiedWrapper = function () {
  /*
  const promiseWrapper = new Promise(function executor(resolveFn, rejectFn) {
    navigator.geolocation.getCurrentPosition(
      function success(positionObj) {
        resolveFn(positionObj.coords);
      },
      function errorCallback(errorObj) {
        rejectFn(errorObj);
      }
    );
  });
  */
  const promiseWrapper = new Promise(function executor(resolveFn, rejectFn) {
    navigator.geolocation.getCurrentPosition(resolveFn, rejectFn);
  });

  return promiseWrapper;
};

geolocationPromisifiedWrapper()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

console.log('Execution ends.');
