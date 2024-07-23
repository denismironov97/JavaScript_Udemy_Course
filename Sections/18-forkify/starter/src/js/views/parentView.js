'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';

export default class ParentView {
  _parentElement;
  _data;
  _errorMessage =
    'Problem with loading current recipe. Search for another similar recipe';
  _successMessage = 'Success!';

  constructor() {}

  render(valueData) {
    this._data = valueData;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinnerAnimation() {
    const spinnerMarkup = `
    <div class="spinner">
            <svg>
              <use href="${iconsSVG}.svg#icon-loader"></use>
            </svg>
          </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  renderSuccessMessage(successMessage = this._successMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${iconsSVG}.svg#icon-smile"></use>
        </svg>
      </div>
      <p>${successMessage}</p>
    </div>
    `;
  }

  renderError(errorMessage = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${iconsSVG}.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${errorMessage}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
