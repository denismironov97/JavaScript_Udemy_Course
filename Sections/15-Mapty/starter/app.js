'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//Elements
const form = document.querySelector('form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  constructor() {
    this._getPosition();

    //Find a better workaround
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  //Protected properties
  get leafLetMap() {
    return this._leafLetMap;
  }

  set leafLetMap(value) {
    this._leafLetMap = value;
  }

  get latitude() {
    return this._latitude;
  }

  set latitude(value) {
    this._latitude = value;
  }

  get longitude() {
    return this._longitude;
  }

  set longitude(value) {
    this._longitude = value;
  }

  //Protected methods
  _getPosition() {
    navigator?.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function failCallback() {
        console.log('Failed to fetch coordinates!');
      }
    );
  }

  _loadMap(positionObjData) {
    const { latitude, longitude } = positionObjData.coords;

    //Google maps link
    console.log(
      'Google maps link',
      `https://www.google.com/maps/@${latitude},${longitude}`
    );

    const coordsArr = [latitude, longitude];

    //Leaflet Map
    this.leafLetMap = L.map('map').setView(coordsArr, 16);

    //Leaflet tiles
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.leafLetMap);

    this.leafLetMap.on('click', this._showForm.bind(this));
  }

  _showForm(mapEvent) {
    form.classList.remove('hidden');
    inputType.focus();

    const { lat: latitude, lng: longitude } = mapEvent.latlng;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  _newWorkout(defaultEvent) {
    defaultEvent.preventDefault();

    const popupContentOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',
    };

    const popupContent = L.popup(popupContentOptions);

    //Marker
    L.marker([this.latitude, this.longitude])
      .addTo(this.leafLetMap)
      .bindPopup(popupContent)
      .setPopupContent('Workout')
      .openPopup();

    //Resetting the form element to it's original state
    form.reset();
    inputType.focus();
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }
}

const app = new App();
