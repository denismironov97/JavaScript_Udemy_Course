'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';

export default class ParentView {
  _parentElement;
  _data;
  _errorMessage = 'Problem with loading current component. Please try again.';
  _successMessage = 'Success in loading component!';

  constructor() {}

  render(valueData) {
    console.log('Value Data:', valueData);

    if (!valueData || (Array.isArray(valueData) && valueData?.length === 0)) {
      return this._renderError();
    }

    this._data = valueData;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  updateRender(valueData) {
    console.log('updateRender accepting arg:', valueData);

    if (!valueData || (Array.isArray(valueData) && valueData?.length === 0)) {
      return this._renderError();
    }

    this._data = valueData;

    const newMarkup = this._generateMarkup();

    // Virtual DOM in memory not on DOM on browser client
    const newDomRange = document
      .createRange()
      .createContextualFragment(newMarkup);

    // Array of all dom elements from range
    const newVirtualElements = Array.from(newDomRange.querySelectorAll('*'));
    const oldBrowserElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newVirtualElements.forEach((newCurrVirtualElem, currIndex) => {
      const oldCurrBrowserElem = oldBrowserElements[currIndex];

      if (
        !newCurrVirtualElem.isEqualNode(oldCurrBrowserElem) &&
        newCurrVirtualElem?.firstChild.nodeValue.trim()
      ) {
        oldCurrBrowserElem.textContent = newCurrVirtualElem.textContent;
      }
    });
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

  _renderError(errorMessage = this._errorMessage) {
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
