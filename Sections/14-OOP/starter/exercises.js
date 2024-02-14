//Exercise #1

/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h
*/

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;

  return this.toString();
};

Car.prototype.brake = function () {
  this.speed -= 5;

  return this.toString();
};

Car.prototype.toString = function () {
  return `${this.speed}km/h-${this.make}`;
};

const car1 = new Car('Jaguar', 250);
console.log(car1.accelerate());
console.log(car1.brake());

const car2 = new Car('BMW', 120);
console.log(car2.brake());
console.log(car2.accelerate());

const car3 = new Car('Mercedes', 95);
console.log(car3.brake());
console.log(car3.accelerate());

console.log(car3 instanceof Car);
*/

/*
// Coding Challenge/Exercise #2

1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;

    return this.toString();
  }

  brake() {
    this.speed -= 5;

    return this.toString();
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(value) {
    this.speed = value * 1.6;
  }

  toString() {
    return `${this.speed}km/h-${this.make}`;
  }
}

const jaguar = new CarCl('Jaguar', 150);
//console.log(jaguar);
//console.log(jaguar.__proto__);

console.log(jaguar.brake());
console.log(jaguar.accelerate());

console.log(`Speed US: ${jaguar.speedUS}`);
jaguar.speedUS = 123;

console.log(jaguar);
