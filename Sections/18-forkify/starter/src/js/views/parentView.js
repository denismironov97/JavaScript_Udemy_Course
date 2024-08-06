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
    // prettier-ignore
    const newDomRange = document.createRange().createContextualFragment(newMarkup);

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

    const accArrEls = newVirtualElements.reduce(function (
      acc,
      newCurrVirtualElem,
      currIndex
    ) {
      const oldCurrBrowserElem = oldBrowserElements[currIndex];
      const nodesAreNotEqual =
        !newCurrVirtualElem.isEqualNode(oldCurrBrowserElem);

      if (!oldCurrBrowserElem) {
        return acc;
      }

      if (nodesAreNotEqual) {
        // Updates changed textContent
        if (newCurrVirtualElem?.firstChild?.nodeValue.trim()) {
          oldCurrBrowserElem.textContent = newCurrVirtualElem.textContent;
        }

        if (oldCurrBrowserElem?.nodeName === 'BUTTON') {
          // Checks for bookmark elem
          if (oldCurrBrowserElem.classList.contains('btn--bookmark')) {
            const oldBrowserUseElem =
              oldCurrBrowserElem.firstElementChild.firstElementChild;
            const newVirtualUseElem =
              newCurrVirtualElem.firstElementChild.firstElementChild;

            setAttributesOfElem(
              oldCurrBrowserElem.firstElementChild.firstElementChild,
              newCurrVirtualElem.firstElementChild.firstElementChild
            );

            return acc;
          }

          acc.push([oldCurrBrowserElem, newCurrVirtualElem]);
        } else if (oldCurrBrowserElem?.nodeName === 'A') {
          setAttributesOfElem(oldCurrBrowserElem, newCurrVirtualElem);
        }
      }

      numIterations++;

      return acc;

      function setAttributesOfElem(oldElem, newVirtualElem) {
        // Iterate through all attributes of the new element and set them to the old element

        for (const currAttr of newVirtualElem.attributes) {
          oldElem.setAttribute(currAttr.name, currAttr.value);
        }
      }
    },
    []);

    // Guard clause check if arr is empty 0 is falsy value
    if (!accArrEls.length) {
      return;
    }

    // [decreaseServingsOldBrowserEl, decreaseServingsNewBrowserEl], [increaseServingsOldBrowserEl, increaseServingsNewBrowserEl]
    const [decServOldBrEl, decServNewBrEl, incServOldBrEl, incServNewBrEl] =
      accArrEls.flat();

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
