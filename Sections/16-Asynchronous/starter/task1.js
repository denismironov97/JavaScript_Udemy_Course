'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
*/

console.log('Hello World!');

const latitudeInputEl = document.querySelector('.container-coords .latitude');
const longitudeInputEl = document.querySelector('.container-coords .longitude');

const getLocation = function (event) {
  //const endPoint = 'https://geocode.xyz/52.508,13.381?geoit=json'; //52.508,13.381
  /*
  fetch(endPoint)
    .then(res => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(res.json());
        }, 3000); // Delay of 2000 milliseconds (2 seconds)
      });
    })
    .then(data => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 3500); // Delay of 2000 milliseconds (2 seconds)
      });
    })
    .then(data => {
      console.log(data);
    });
  */

  //Removing previous geo details panel
  document.querySelector('.geo-panel')?.remove();

  const latitude = parseFloat(this.latitude.value);
  const longitude = parseFloat(this.longitude.value);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error('Input proper coordinates!');
    this.latitude.value = '';
    this.longitude.value = '';
    return;
  }
  const endPoint = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

  fetch(endPoint)
    .then(initialResponse => {
      if (!initialResponse.ok) {
        throw new Error('Error in initial API response.');
      }

      return initialResponse.json();
    })
    .then(readableStreamData => {
      console.log(readableStreamData);

      if (typeof readableStreamData !== 'object') {
        throw new Error('Data from read from stream is not an object.');
      }

      const divPanelEl = constructGeoDetailsPanel(readableStreamData);

      document
        .querySelector('.container')
        .insertBefore(divPanelEl, document.querySelector('.images'));
    })
    .catch(errorObj => console.error(errorObj.message));

  this.latitude.value = '';
  this.longitude.value = '';
};

const constructGeoDetailsPanel = function (objData) {
  const { latitude, longitude, continent, countryName, city } = objData;

  const divPanelEl = document.createElement('div');
  divPanelEl.classList.add('geo-panel');

  const spanLatitudeEl = document.createElement('span');
  spanLatitudeEl.classList.add('span-geo-details');
  spanLatitudeEl.textContent = `latitude: ${latitude}`;

  const spanLongitudeEl = document.createElement('span');
  spanLongitudeEl.classList.add('span-geo-details');
  spanLongitudeEl.textContent = `longitude: ${longitude}`;

  const spanContinentEl = document.createElement('span');
  spanContinentEl.classList.add('span-geo-details');
  spanContinentEl.textContent = `continent: ${continent}`;

  const spanCountryNameEl = document.createElement('span');
  spanCountryNameEl.classList.add('span-geo-details');
  spanCountryNameEl.textContent = `country: ${countryName}`;

  const spanCityEl = document.createElement('span');
  spanCityEl.classList.add('span-geo-details');
  spanCityEl.textContent = `city: ${city}`;

  divPanelEl.append(
    spanLatitudeEl,
    spanLongitudeEl,
    spanContinentEl,
    spanCountryNameEl,
    spanCityEl
  );

  return divPanelEl;
};

document.querySelector('.btn-country').addEventListener(
  'click',
  getLocation.bind({
    latitude: latitudeInputEl,
    longitude: longitudeInputEl,
  })
);
