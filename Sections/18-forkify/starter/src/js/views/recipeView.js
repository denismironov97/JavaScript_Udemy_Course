'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';

//Importing fractional from fractional library
import { Fraction } from 'fractional';

//Importing parent class - ParentView
import View from './parentView.js';

class RecipeView extends View {
  _windowEventTypes = ['load', 'hashchange'];

  constructor() {
    super();

    this._parentElement = document.querySelector('.recipe');
    this._errorMessage =
      'Problem with loading current recipe. Please try again.';
  }

  //Publisher-s
  addHandlerRender(handlerCallbackFn) {
    this._windowEventTypes.forEach(currEv =>
      window.addEventListener(currEv, handlerCallbackFn)
    );
  }

  /*
  addHandlerUpdateServings(handlerCallbackFn) {
    this._parentElement.addEventListener('click', function clickHandler(event) {
      // Closest clicked btn Element. Could be decrease or increase btn Elem.
      const btnElement = event.target.closest('.btn--tiny');

      if (!btnElement) {
        return;
      }

      const newServingsNum = Number(btnElement.dataset.servingsNum);

      // Add a guard clause to ensure newServingsNum is at least 1 to prevent negative or zero servings.
      if (newServingsNum < 1) {
        console.log('clause activated!');
        return;
      }

      handlerCallbackFn(newServingsNum);
    });
  }

  addHandlerBookmark(handlerCallbackFn) {
    this._parentElement.addEventListener('click', function (event) {
      const bookmarkBtn = event.target.closest('.btn--bookmark');

      if (!bookmarkBtn) {
        return;
      }

      handlerCallbackFn();
    });
  }
  */

  addHandlers(handlerUpdateServingsFn, handlerBookmarkFn) {
    this._parentElement.addEventListener('click', function (event) {
      const btnElement = event.target.closest('.btn--tiny, .btn--bookmark');

      if (!btnElement) {
        return;
      }

      if (btnElement.classList.contains('btn--tiny')) {
        const newServingsNum = Number(btnElement.dataset.servingsNum);

        // Add a guard clause to ensure newServingsNum is at least 1 to prevent negative or zero servings.
        if (newServingsNum < 1) {
          console.log('Guard clause activated!');
          return;
        }

        handlerUpdateServingsFn(newServingsNum);
      } else if (btnElement.classList.contains('btn--bookmark')) {
        handlerBookmarkFn();
      }
    });
  }

  _generateMarkup() {
    const {
      publisher,
      ingredients,
      sourceUrl,
      imageUrl,
      title,
      servings,
      cookingTime,
      id,
    } = this._data;

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
          <button data-servings-num="${
            this._data.servings - 1
          }" class="btn--tiny btn--decrease-servings">
            <svg>
              <use href="${iconsSVG}.svg#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-servings-num="${
            this._data.servings + 1
          }" class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${iconsSVG}.svg#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
    
      <div class="recipe__user-generated">
        
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${iconsSVG}.svg#icon-bookmark"></use>
        </svg>
      </button>
    </div>
    
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${ingredients.map(this._generateIngredientsMarkup).join('')}
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

    return recipeMarkup;
  }

  _generateIngredientsMarkup({ quantity, unit, description }) {
    (quantity ??= ''), (unit ??= '');

    if (quantity) {
      quantity = new Fraction(quantity).toString();
    }

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
  }
}

const recipeViewObj = new RecipeView();
export default recipeViewObj;
