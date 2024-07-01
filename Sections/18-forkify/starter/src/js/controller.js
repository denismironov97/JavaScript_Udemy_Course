'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../img/icons.svg';

//Polyfilling ES features
import 'core-js/stable';

//Polyfilling async/await
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
const windowEventTypes = ['load', 'hashchange'];

/*
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
*/

//recipeId, arg1, arg2
const getRecipeDataById = async function (ev) {
  renderSpinnerAnimation(recipeContainer);

  console.log('this', this);
  console.log('event', ev);

  /*
  try {
    if(!recipeId) {
      throw new Error('Missing hash to perform id request');
    }


    const initialRes = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );

    if (!initialRes.ok) {
      throw new Error(
        `Initial server response failed -> status code: ${initialRes.status} status text: ${initialRes.statusText}!`
      );
    }

    const {
      data: { recipe },
    } = await initialRes.json();

    //Removing rendered spinner element
    recipeContainer.firstElementChild.remove();

    const regExPattern = /_([a-z])/g;
    const replacementString = function (_, letter) {
      return letter.toUpperCase();
    };

    const convertToCamelCase = str => {
      return str.replace(regExPattern, replacementString);
    };

    const recipeData = Object.entries(recipe).reduce(
      (acc, [currKey, value]) => {
        const newKey = convertToCamelCase(currKey);
        acc[newKey] = value;
        return acc;
      },
      {}
    );

    console.log(recipeData);

    renderRecipe(recipeData);
  } catch (error) {
    console.log(error.message);
  }
  */
};

const renderRecipe = function ({
  publisher,
  ingredients,
  sourceUrl,
  imageUrl,
  title,
  servings,
  cookingTime,
  id,
}) {
  const recipeMarkup = `
  <figure class="recipe__fig">
    <img src="${imageUrl}" alt="${title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${title}</span>
    </h1>
  </figure>
  
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${iconsSVG}.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${iconsSVG}.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${servings}</span>
      <span class="recipe__info-text">servings</span>
  
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${iconsSVG}.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${iconsSVG}.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  
    <div class="recipe__user-generated">
      <svg>
        <use href="${iconsSVG}.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${iconsSVG}.svg#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>
  
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${ingredients
        .map(({ quantity, unit, description }) => {
          return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${iconsSVG}.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${quantity}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${unit}</span>
          ${description}
        </div>
      </li>
        `;
        })
        .join('')}
    </ul>
  </div>
  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${iconsSVG}.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;

  recipeContainer.insertAdjacentHTML('afterbegin', recipeMarkup);
};

const renderSpinnerAnimation = parentElem => {
  const spinnerMarkup = `
  <div class="spinner">
          <svg>
            <use href="${iconsSVG}.svg#icon-loader"></use>
          </svg>
        </div>
  `;

  parentElem.innerHTML = '';
  parentElem.insertAdjacentHTML('afterbegin', spinnerMarkup);
};

//getRecipeDataById('5ed6604591c37cdc054bc886');

windowEventTypes.forEach(currEvType => {
  window.addEventListener(
    currEvType,
    getRecipeDataById.bind(window.location.hash)
  );
});
