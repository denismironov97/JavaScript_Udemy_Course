// Exporting module
console.log('Executing code of exporting module line --- 1');

const shippingCost = 10;
export const stringVariable = 'string variable';
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

console.log('Executing code of exporting module line --- 2');

const stringVar = 'variable of type string';

const totalPrice = 237;
const totalQuantity = 23;
// renaming exporting variables
export { totalPrice, totalQuantity as tq };

console.log('variable: ', stringVar);

console.log('Executing code of exporting module line --- 3');

//export statements are non-blocking operations
//can only have one default export statement per module
//export default
export default class Cat {
  constructor(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
  }

  sayMeow() {
    return `${this.name} says meow meow`;
  }

  getCatStats() {
    return {
      name: this.name,
      age: this.age,
      color: this.color,
    };
  }
}
