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

  constructor() {
    super();

    this._parentElement = document.querySelector('.upload');
    this._recipeModalWindow = document.querySelector('.add-recipe-window');
    this._overlayWindow = document.querySelector('.overlay');

    this._btnOpenModalForm = document.querySelector('.nav__btn--add-recipe');
    this._btnCloseModalForm = document.querySelector('.btn--close-modal');

    console.log(this._overlayWindow);
    console.log(this._recipeModalWindow);

    // Called as soon as page loads or object from class addRecipeView is instanced.
    this._showModalForm();
    this._hideModalForm();
  }

  _toggleModalWindow() {
    //Take the overlay elem and remove hidden class
    this._overlayWindow.classList.toggle('hidden');
    this._recipeModalWindow.classList.toggle('hidden');
  }

  _showModalForm(handlerFnOne, handlerFnTwo) {
    this._btnOpenModalForm.addEventListener(
      'click',
      this._toggleModalWindow.bind(this)
    );
  }

  _hideModalForm() {
    this._overlayWindow.addEventListener(
      'click',
      this._toggleModalWindow.bind(this)
    );

    this._btnCloseModalForm.addEventListener(
      'click',
      this._toggleModalWindow.bind(this)
    );
  }

  //Publisher-s
  addHandlerSubmitUploadRecipe(handlerFunction) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const recipeData = Array.from(formData.entries());

      handlerFunction(recipeData);
    });
  }

  _generateMarkup() {}

  _generateIngredientsMarkup() {}
}

export default new addRecipeView();
