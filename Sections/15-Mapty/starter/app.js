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
    this.workouts = [];

    this._getPosition();

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
    this.leafLetMap = L.map('map').setView(coordsArr, 17);

    //Leaflet tiles
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.leafLetMap);

    this.leafLetMap.on('click', this._showForm.bind(this));
  }

  _showForm(mapEvent) {
    form.classList.remove('hidden');
    inputDistance.focus();

    const { lat: latitude, lng: longitude } = mapEvent.latlng;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  _newWorkout(defaultEvent) {
    defaultEvent.preventDefault();

    //Determine workout activity type
    const workoutType = inputType.value.replace(
      inputType.value[0],
      inputType.value[0].toUpperCase()
    );

    //Data validation
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const cadence = Number(inputCadence.value);
    const elevation = Number(inputElevation.value);

    const dependingValue = workoutType === 'Running' ? cadence : elevation;

    //Guard Clause
    if (
      this._CheckForIncorrectInputData([distance, duration, dependingValue])
    ) {
      return window.alert('Please fill in correct input for workout!');
    }

    //Important!
    let currWorkout;
    if (workoutType === 'Running') {
      currWorkout = new Running(
        distance,
        duration,
        { latitude: this.latitude, longitude: this.longitude },
        cadence,
        workoutType
      );
    } else {
      currWorkout = new Cycling(
        distance,
        duration,
        { latitude: this.latitude, longitude: this.longitude },
        elevation,
        workoutType
      );
    }

    this._clearWorkoutList();

    this.workouts.push(currWorkout);

    this._craftWorkoutsList();

    /*
    const currWorkoutComponent = this._CraftWorkoutComponent(
      currWorkout,
      workoutType.toLowerCase()
    );

    containerWorkouts.append(currWorkoutComponent);\
    */

    //Internationalization API
    const dateFormatString = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(currWorkout.date);

    const popupContentOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `leaflet-popup ${workoutType.toLowerCase()}-popup`,
    };

    const popupContent = L.popup(popupContentOptions);

    //Marker
    L.marker([this.latitude, this.longitude])
      .addTo(this.leafLetMap)
      .bindPopup(popupContent)
      .setPopupContent(`${currWorkout.workoutType} on ${dateFormatString}`)
      .openPopup();

    //Resetting the form element to it's original state
    inputDistance.focus();

    if (workoutType === 'Cycling') {
      this._toggleElevationField();
    }

    form.reset();
    form.classList.toggle('hidden');
  }

  _toggleElevationField() {
    inputDistance.focus();
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _craftWorkoutComponent(currWorkoutObj) {
    const workoutDataAssocArr = {
      activityType: { Running: '🏃‍♂️', Cycling: '🚴‍♀️' },
      dependingActivity: {
        Running: currWorkoutObj.pace,
        Cycling: currWorkoutObj.speed,
      },
      acceleratingValue: {
        Running: 'min/km',
        Cycling: 'km/h',
      },
      activityTypeIcon: {
        Running: '🦶🏼',
        Cycling: '⛰',
      },
      cadenceOrElevationGain: {
        Running: currWorkoutObj.cadence,
        Cycling: currWorkoutObj.elevationGain,
      },
      workoutUnitType: {
        Running: 'spm',
        Cycling: 'm',
      },
    };

    const liActivityElem = document.createElement('li');
    liActivityElem.classList.add(
      'workout',
      `workout--${currWorkoutObj.workoutType.toLowerCase()}`
    );
    liActivityElem.dataset.id = currWorkoutObj.id;

    const h2Elem = document.createElement('h2');
    h2Elem.classList.add('workout__title');
    h2Elem.textContent = `${currWorkoutObj.workoutType.replace(
      currWorkoutObj.workoutType[0],
      currWorkoutObj.workoutType[0].toUpperCase()
    )} on ${
      months[currWorkoutObj.date.getMonth() - 1]
    } ${currWorkoutObj.date.getDate()}`;

    //Div1 container
    const divWorkoutDetails1 = document.createElement('div');
    divWorkoutDetails1.classList.add('workout__details');

    const spanWorkoutDetailsIcon1 = document.createElement('span');
    spanWorkoutDetailsIcon1.classList.add('workout__icon');
    //spanWorkoutDetailsIcon1.textContent = currWorkoutObj.workoutType === 'Running' ? '🏃‍♂️' : '🚴‍♀️';

    spanWorkoutDetailsIcon1.textContent =
      workoutDataAssocArr.activityType[currWorkoutObj.workoutType];

    const spanWorkoutValue1 = document.createElement('span');
    spanWorkoutValue1.classList.add('workout__value');
    spanWorkoutValue1.textContent = currWorkoutObj.distance;

    const spanWorkoutUnit1 = document.createElement('span');
    spanWorkoutUnit1.classList.add('workout__unit');
    spanWorkoutUnit1.textContent = 'km';

    divWorkoutDetails1.append(
      spanWorkoutDetailsIcon1,
      spanWorkoutValue1,
      spanWorkoutUnit1
    );

    //Div2 container
    const divWorkoutDetails2 = document.createElement('div');
    divWorkoutDetails2.classList.add('workout__details');

    const spanWorkoutDetailsIcon2 = document.createElement('span');
    spanWorkoutDetailsIcon2.classList.add('workout__icon');
    spanWorkoutDetailsIcon2.textContent = '⏱';

    const spanWorkoutValue2 = document.createElement('span');
    spanWorkoutValue2.classList.add('workout__value');
    spanWorkoutValue2.textContent = currWorkoutObj.duration;

    const spanWorkoutUnit2 = document.createElement('span');
    spanWorkoutUnit2.classList.add('workout__unit');
    spanWorkoutUnit2.textContent = 'min';

    divWorkoutDetails2.append(
      spanWorkoutDetailsIcon2,
      spanWorkoutValue2,
      spanWorkoutUnit2
    );

    //Div3 container
    const divWorkoutDetails3 = document.createElement('div');
    divWorkoutDetails3.classList.add('workout__details');

    const spanWorkoutDetailsIcon3 = document.createElement('span');
    spanWorkoutDetailsIcon3.classList.add('workout__icon');
    spanWorkoutDetailsIcon3.textContent = '⚡️';

    const spanWorkoutValue3 = document.createElement('span');
    spanWorkoutValue3.classList.add('workout__value');
    //spanWorkoutValue3.textContent = currWorkoutObj.workoutType === 'Running' ? currWorkoutObj.pace : currWorkoutObj.speed;
    spanWorkoutValue3.textContent =
      workoutDataAssocArr.dependingActivity[currWorkoutObj.workoutType];

    const spanWorkoutUnit3 = document.createElement('span');
    spanWorkoutUnit3.classList.add('workout__unit');
    //spanWorkoutUnit3.textContent = currWorkoutObj.workoutType === 'Running' ? 'min/km' : 'km/h';
    spanWorkoutUnit3.textContent =
      workoutDataAssocArr.acceleratingValue[currWorkoutObj.workoutType];

    divWorkoutDetails3.append(
      spanWorkoutDetailsIcon3,
      spanWorkoutValue3,
      spanWorkoutUnit3
    );

    //Div4 container
    const divWorkoutDetails4 = document.createElement('div');
    divWorkoutDetails4.classList.add('workout__details');

    const spanWorkoutDetailsIcon4 = document.createElement('span');
    spanWorkoutDetailsIcon4.classList.add('workout__icon');
    //spanWorkoutDetailsIcon4.textContent = currWorkoutObj.workoutType === 'Running' ? '🦶🏼' : '⛰';
    spanWorkoutDetailsIcon4.textContent =
      workoutDataAssocArr.activityTypeIcon[currWorkoutObj.workoutType];

    const spanWorkoutValue4 = document.createElement('span');
    spanWorkoutValue4.classList.add('workout__value');
    //spanWorkoutValue4.textContent = currWorkoutObj.workoutType === 'Running' ? currWorkoutObj.cadence : currWorkoutObj.elevationGain;
    spanWorkoutValue4.textContent =
      workoutDataAssocArr.cadenceOrElevationGain[currWorkoutObj.workoutType];

    const spanWorkoutUnit4 = document.createElement('span');
    spanWorkoutUnit4.classList.add('workout__unit');
    //spanWorkoutUnit4.textContent = currWorkoutObj.workoutType === 'Running' ? 'spm' : 'm';
    spanWorkoutUnit4.textContent =
      workoutDataAssocArr.workoutUnitType[currWorkoutObj.workoutType];

    divWorkoutDetails4.append(
      spanWorkoutDetailsIcon4,
      spanWorkoutValue4,
      spanWorkoutUnit4
    );

    liActivityElem.append(
      h2Elem,
      divWorkoutDetails1,
      divWorkoutDetails2,
      divWorkoutDetails3,
      divWorkoutDetails4
    );

    return liActivityElem;
  }

  _craftWorkoutsList() {
    const workoutComponents = this.workouts.map(
      function (currWorkoutObj, currIndex, arrRef) {
        const currWorkoutComponent =
          this._craftWorkoutComponent(currWorkoutObj);

        return currWorkoutComponent;
      }.bind(this)
    );

    containerWorkouts.append(...workoutComponents);
  }

  _clearWorkoutList() {
    const liElems = containerWorkouts.querySelectorAll('li.workout');
    liElems.forEach(el => {
      el.remove();
    });
  }

  _CheckForIncorrectInputData(inputsArr) {
    //prev params: distance, duration, dependingValue
    /*
    return (
      distance <= 0 ||
      Number.isNaN(distance) ||
      duration <= 0 ||
      Number.isNaN(duration) ||
      dependingValue <= 0 ||
      Number.isNaN(dependingValue)
    );
    */

    return inputsArr.some(currInput => {
      return Number.isNaN(currInput) || currInput <= 0;
    });
  }
}

//Parent class for workout
class WorkoutParent {
  constructor(distance, duration, coords, workoutType) {
    this.id = Date.now().toString();

    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this.date = new Date();
    this.workoutType = workoutType;
  }
}

class Running extends WorkoutParent {
  constructor(distance, duration, coords, cadence, workoutType) {
    super(distance, duration, coords, workoutType);

    this.cadence = cadence;
    this.pace = this._calcPace();
  }

  _calcPace() {
    return Math.trunc(this.duration / this.distance);
  }
}

class Cycling extends WorkoutParent {
  constructor(distance, duration, coords, elevationGain, workoutType) {
    super(distance, duration, coords, workoutType);

    this.elevationGain = elevationGain;
    this._calcSpeed();
  }

  _calcSpeed() {
    this.speed = Math.trunc(this.distance / (this.duration / 60));
  }
}

const app = new App();
