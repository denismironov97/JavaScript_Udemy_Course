// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

'use strict';

/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

//-----------------------------------------------------------------------------
console.log('start...');

//const imgElement = document.querySelector('.image-container img');
//src path - http://127.0.0.1:8080/imgs/img-1.jpg
//const spanElem = document.querySelector('.number-container span');

const imgContainer = document.querySelector('.image-container');

// Part 1 ver 1
/*
let indexPath = 1;

const setTimeoutPromisified = async function (timeInSeconds) {
  const promiseWrapper = new Promise(function executor(resolveFn, rejectFn) {
    setTimeout(function () {
      resolveFn(redirectImgPath(indexPath));
    }, timeInSeconds * 1000);
  });

  return promiseWrapper;
};

const waitAsyncHandler = async function (secondsArg) {
  return await setTimeoutPromisified(secondsArg);
};

const redirectImgPath = function (indexPathArg) {
  indexPath++;
  imgElement.src = `http://127.0.0.1:8080/imgs/img-${indexPathArg}.jpg`;
};

try {
  waitAsyncHandler(5)
    .then(function () {
      console.log('img path redirect-2');
      spanElem.textContent = 2;

      return waitAsyncHandler(3);
    })
    .then(() => {
      console.log('img path redirect-3');
      spanElem.textContent = 3;
    });
} catch (error) {
  console.log(error.message);
}
*/

//Part 1 ver 2
const setTimeoutPromisified = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

/*
let currentImg;

createImage('imgs/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return setTimeoutPromisified(3);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('imgs/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return setTimeoutPromisified(3);
  })
  .then(() => {
    currentImg.style.display = 'none';
    const imgElem3 = createImage('imgs/img-3.jpg');

    return imgElem3;
  })
  .then(imgElem => {
    currentImg = imgElem;
    console.log('Image 3 loaded');

    return setTimeoutPromisified(3);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
  */

const loadNPause = async function () {
  try {
    //When await keyword is interpreted it automatically releases the current
    //functional execution context/execution context from the call stack
    let currImgElement = await createImage('imgs/img-1.jpg');
    console.log('Image 1 loaded');

    await setTimeoutPromisified(10);

    hideImgElem(currImgElement);

    currImgElement = await createImage('imgs/img-2.jpg');
    console.log('Image 2 loaded');

    await setTimeoutPromisified(10);

    hideImgElem(currImgElement);

    currImgElement = await createImage('imgs/img-3.jpg');
    console.log('Image 3 loaded');

    await setTimeoutPromisified(10);

    hideImgElem(currImgElement);
  } catch (err) {
    console.log(err.message);
  }

  function hideImgElem(imgElem) {
    imgElem.style.display = 'none';
  }
};

//loadNPause();

//Part 2
const imgPathsArr = new Array(
  'imgs/img-1.jpg',
  'imgs/img-2.jpg',
  'imgs/img-3.jpg'
);

const loadAll = async function (imgPathsArrArg) {
  try {
    const promisesArr = imgPathsArrArg.map(async function (currImgPath) {
      return await createImage(currImgPath);
    });

    console.log('Printing something before fn exec context disconnect');

    const imgsElementsArr = await Promise.all(promisesArr);

    console.log('Printing something AFTER fn exec context RESUMES');

    console.log(imgsElementsArr);
  } catch (error) {
    console.log(`Error: ${error.message} ---.`);
  }
};

loadAll(imgPathsArr);

//-----------------------------------------------------------------------------
console.log('finished, completed!');
