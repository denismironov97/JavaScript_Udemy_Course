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

    /*
    // Old fix - works fine
    newVirtualElements.forEach((newCurrVirtualElem, currIndex) => {
      const oldCurrBrowserElem = oldBrowserElements[currIndex];

      // Updates changed textContext
      // First Node str is truthy
      if (
        !newCurrVirtualElem.isEqualNode(oldCurrBrowserElem) &&
        newCurrVirtualElem?.firstChild.nodeValue.trim()
      ) {
        oldCurrBrowserElem.textContent = newCurrVirtualElem.textContent;
      }
  
      if (
        !newCurrVirtualElem.isEqualNode(oldCurrBrowserElem) &&
        newCurrVirtualElem.nodeName === 'BUTTON'
      ) {
        oldCurrBrowserElem.dataset.servingsNum =
          newCurrVirtualElem.dataset.servingsNum;
      }
    });
    */

    let numIterations = 0;

    // [decreaseServingsOldBrowserEl, decreaseServingsNewBrowserEl], [increaseServingsOldBrowserEl, increaseServingsNewBrowserEl]
    const [[decServOldBrEl, decServNewBrEl], [incServOldBrEl, incServNewBrEl]] =
      newVirtualElements.reduce(function (acc, newCurrVirtualElem, currIndex) {
        const oldCurrBrowserElem = oldBrowserElements[currIndex];

        // Updates changed textContext
        // First Node str is truthy
        if (
          !newCurrVirtualElem.isEqualNode(oldCurrBrowserElem) &&
          newCurrVirtualElem?.firstChild.nodeValue.trim()
        ) {
          oldCurrBrowserElem.textContent = newCurrVirtualElem.textContent;
        }

        if (
          !newCurrVirtualElem.isEqualNode(oldCurrBrowserElem) &&
          newCurrVirtualElem.nodeName === 'BUTTON'
        ) {
          acc.push([oldCurrBrowserElem, newCurrVirtualElem]);
        }

        numIterations++;

        return acc;
      }, []);

    decServOldBrEl.dataset.servingsNum = decServNewBrEl.dataset.servingsNum;
    incServOldBrEl.dataset.servingsNum = incServNewBrEl.dataset.servingsNum;

    console.log('numIterations:', numIterations);
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
