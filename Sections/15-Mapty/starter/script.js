'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//Optional chaining check if there is a navigator.geolocation API in browser
navigator?.geolocation.getCurrentPosition(
  function successCallback(positionObjData) {
    const { latitude, longitude } = positionObjData.coords;

    //Google maps link
    console.log(
      'Google maps link',
      `https://www.google.com/maps/@${latitude},${longitude}`
    );

    const coordsArr = [latitude, longitude];

    //Map
    const map = L.map('map').setView(coordsArr, 17);

    //Map tiles
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', function (mapEvent) {
      const { lat: latitude, lng: longitude } = mapEvent.latlng;

      const markerOptions = {
        riseOnHover: true,
      };

      const popupContentOptions = {
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      };

      const popupContent = L.popup(popupContentOptions);

      //Marker
      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(popupContent)
        .setPopupContent('Workout')
        .openPopup();
    });
  },
  function failCallback() {
    console.log('Failed to fetch coordinates!');
  }
);
