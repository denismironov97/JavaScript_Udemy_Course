'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const coordsData = {
  latitude: undefined,
  longitude: undefined,
};

let leafLetMap;

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
    leafLetMap = L.map('map').setView(coordsArr, 17);

    //Map tiles
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafLetMap);

    leafLetMap.on('click', function (mapEvent) {
      form.classList.remove('hidden');
      inputType.focus();

      const { lat: latitude, lng: longitude } = mapEvent.latlng;
      coordsData.latitude = latitude;
      coordsData.longitude = longitude;
    });
  },
  function failCallback() {
    console.log('Failed to fetch coordinates!');
  }
);

//form event triggered enter key also by default
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const popupContentOptions = {
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  };

  const popupContent = L.popup(popupContentOptions);

  const markerOptions = {
    riseOnHover: true,
  };

  //Marker
  L.marker([coordsData.latitude, coordsData.longitude], markerOptions)
    .addTo(leafLetMap)
    .bindPopup(popupContent)
    .setPopupContent('Workout')
    .openPopup();

  //Resetting the form element to it's original state
  form.reset();
  inputType.focus();
});

inputType.addEventListener('change', () => {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});
