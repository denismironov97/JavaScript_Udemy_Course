/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

'use strict';

const imgElement = document.querySelector('.image-container img');
//src path - http://127.0.0.1:8080/imgs/img-3.jpg

const changeImgSourcePath = function (secondsArg = 0) {
  imgElement.src = `http://127.0.0.1:8080/imgs/img-${indexPath}.jpg`;
  indexPath++;

  return setTimeoutPromiseWrapper(secondsArg);
};

const setTimeoutPromiseWrapper = function (seconds) {
  const promiseWrapper = new Promise(function executor(resolveFn, rejectFn) {
    setTimeout(function timerHandler() {
      resolveFn();
    }, seconds * 1000);
  });

  return promiseWrapper;
};

console.log('Wait for 5 seconds to pass before start to switch img-s.');

let indexPath = 1;
setTimeoutPromiseWrapper(5)
  .then(() => {
    console.log('Loaded img 1');

    return changeImgSourcePath(2);
  })
  .then(() => {
    console.log('Loaded img 2');

    return changeImgSourcePath(2);
  })
  .then(() => {
    console.log('Loaded img 3');

    return changeImgSourcePath(5);
  })
  .catch(err => console.error(err))
  .finally(() => {
    imgElement.style.display = 'none';
  });
