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

/*
//Import everything that's been exported as object containing everything
import * as ModuleObject from './shoppingCartModule.js';

ModuleObject.addToCart('coffee', 50);
ModuleObject.addToCart('energy drink', 13);

console.log(ModuleObject.cart);

console.log(ModuleObject.totalPrice);
console.log(ModuleObject.tq);
*/

/*
import CatClass from './shoppingCartModule.js';

const cat = new CatClass('Winston', 3, 'black');

console.log(cat);

console.log(cat.getCatStats());
console.log(cat.sayMeow());
*/

import { lastPost2 } from './topLevelAwaitModule.js';
import { shoppingCartAPI } from './modulePatternLegacy.js';

// No need to specify the entire path to the lib bundling tools will find them based on lib name provided
import cloneDeepDef from 'lodash-es';

import 'core-js/stable';
import 'regenerator-runtime';

console.log('Executing line - - - 1');
console.log(lastPost2);

shoppingCartAPI.addToCart('pizza', 3);
shoppingCartAPI.addToCart('garlic sauce', 5);

shoppingCartAPI.orderStock('dough', 44);
shoppingCartAPI.orderStock('peperoni', 17);
shoppingCartAPI.orderStock('tomato sauce', 30);

const cat = {
  paws: {
    pawOne: 'black',
    pawTwo: 'orange',
    pawThree: 'grey',
    pawFour: 'white',
  },
  name: 'Sharo',
  age: 4,
};

const catDeepClone = cloneDeepDef(cat);

//Provided in newer versions on Node.JS
const catDeepCloneCloneStruct = structuredClone(cat);

console.log(catDeepClone);
console.log(catDeepCloneCloneStruct);

//Common JavaScript Module
//const { printWrapper } = require('./commonJavaScriptModules.js');

//Requires a js module bundler to work in browser environment
//printWrapper(1);

//Parcel hot module replacement
if (module.hot) {
  module.hot.accept();
}
