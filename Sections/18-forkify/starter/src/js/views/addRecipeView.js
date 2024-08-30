'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';

//Importing fractional from fractional library
import { Fraction } from 'fractional';

//Importing parent class - ParentView
import View from './parentView.js';

class addRecipeView extends View {
  _recipeModalWindow;
  _overlayWindow;
  _btnOpenModalForm;
  _btnCloseModalForm;
  _successMessage = 'Successfully uploaded custom recipe!';

  constructor() {
    super();

    // Form element
    this._parentElement = document.querySelector('.upload');

    this._recipeModalWindow = document.querySelector('.add-recipe-window');
    this._overlayWindow = document.querySelector('.overlay');

    this._btnOpenModalForm = document.querySelector('.nav__btn--add-recipe');
    this._btnCloseModalForm = document.querySelector('.btn--close-modal');

    // console.log(this._overlayWindow);
    // console.log(this._recipeModalWindow);

    // Called as soon as page loads or object from class addRecipeView is instanced.
    this._showModalForm();
    this._hideModalForm();
  }

  restoreOriginalFormElem() {
    const formMarkup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', formMarkup);
  }

  _generateMarkup() {
    const markup = `
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST-Default-Val" required name="title" type="text" />
          <label>URL</label>
          <input
            value="TEST-Default-Val"
            required
            name="sourceUrl"
            type="text"
          />
          <label>Image URL</label>
          <input value="TEST-Default-Val" required name="image" type="text" />
          <label>Publisher</label>
          <input
            value="TEST-Default-Val"
            required
            name="publisher"
            type="text"
          />
          <label>Prep time</label>
          <input value="27" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="6" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${iconsSVG}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    `;

    return markup;
  }

  toggleModalWindow() {
    //Take the overlay elem and remove hidden class
    this._overlayWindow.classList.toggle('hidden');
    this._recipeModalWindow.classList.toggle('hidden');
  }

  _showModalForm(handlerFnOne, handlerFnTwo) {
    this._btnOpenModalForm.addEventListener(
      'click',
      this.toggleModalWindow.bind(this)
    );
  }

  _hideModalForm() {
    this._overlayWindow.addEventListener(
      'click',
      this.toggleModalWindow.bind(this)
    );

    this._btnCloseModalForm.addEventListener(
      'click',
      this.toggleModalWindow.bind(this)
    );
  }

  //Publisher-s
  addHandlerSubmitUploadRecipe(handlerFunction) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const recipeData = Object.fromEntries(formData.entries());

      // This in curr context points to element that ev. listener is attached.
      // Resets form input fields to original html data.
      this.reset();

      handlerFunction(recipeData);
    });
  }
}

export default new addRecipeView();
