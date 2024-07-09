'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;

  constructor() {}

  render(valueData) {
    this.#data = valueData;
    const markup = this.#generateMarkup();

    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinnerAnimation() {
    const spinnerMarkup = `
    <div class="spinner">
            <svg>
              <use href="${iconsSVG}.svg#icon-loader"></use>
            </svg>
          </div>
    `;

    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    const {
      publisher,
      ingredients,
      sourceUrl,
      imageUrl,
      title,
      servings,
      cookingTime,
      id,
    } = this.#data;

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
        ${ingredients.map(this.#generateIngredientsMarkup).join('')}
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

  #generateIngredientsMarkup({ quantity, unit, description }) {
    (quantity ??= ''), (unit ??= '');

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
