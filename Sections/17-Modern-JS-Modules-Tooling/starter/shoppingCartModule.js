// Exporting module
console.log('Executing code of exporting module line --- 1');

const shippingCost = 10;
export const stringVariable = 'string variable';
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;
// renaming exporting variables
export { totalPrice, totalQuantity as tq };

console.log('Executing code of exporting module line --- 2');
