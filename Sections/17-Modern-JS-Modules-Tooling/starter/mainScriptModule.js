/*
import {
  stringVariable,
  cart,
  addToCart,
  tq,
  totalPrice as totalCost,
} from './shoppingCartModule.js';

console.log('hello world!');

console.log(stringVariable);

addToCart('pizza', 3);

console.log(tq);

console.log(totalCost);
//console.log(totalPrice);//Error! - Uncaught ReferenceError: totalPrice is not defined
*/

//Import everything that's been exported as object containing everything
import * as ModuleObject from './shoppingCartModule.js';

ModuleObject.addToCart('coffee', 50);
ModuleObject.addToCart('energy drink', 13);

console.log(ModuleObject.cart);

console.log(ModuleObject.totalPrice);
console.log(ModuleObject.tq);
