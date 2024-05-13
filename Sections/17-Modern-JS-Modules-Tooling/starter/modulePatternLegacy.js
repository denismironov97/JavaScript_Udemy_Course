///////////////////////////////////////
// The Module Pattern

export const shoppingCartAPI = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  const objectAPI = {
    addToCart,
    orderStock,
  };

  return objectAPI;
})();

//shoppingCartAPI.addToCart('apple', 4);
//shoppingCartAPI.addToCart('pizza', 2);
console.log(shoppingCartAPI);
console.log(shoppingCartAPI.shippingCost);
