'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';

import View from './parentView.js';

class PaginationView extends View {
  constructor() {
    super();

    this._parentElement = document.querySelector('.pagination');
  }

  addHandlerClick(handlerFn) {
    this._parentElement.addEventListener('click', function eventHandler(event) {
      // Event delegation
      const buttonElem = event.target.closest('.btn--inline');

      if (!buttonElem) {
        console.log('Element:', buttonElem);
        return;
      }

      const goToPageNumber = Number(buttonElem.dataset.goToPage);

      handlerFn(goToPageNumber);
    });
  }

  _generateMarkup() {
    const { results: resultsArr, resultsPerPage, currPage } = this._data;

    //numPages
    const numOfPagesSegmentation = Math.ceil(
      resultsArr.length / resultsPerPage
    );

    // Page 1 and more following pages
    if (currPage === 1 && numOfPagesSegmentation > 1) {
      return this._generateBtnMarkup('next', currPage);
    }

    // Other pages than page 1 || last page
    if (currPage > 1 && currPage < numOfPagesSegmentation) {
      return this._generateBtnMarkup('both', currPage);
    }

    // Last page/End page
    if (currPage === numOfPagesSegmentation && numOfPagesSegmentation > 1) {
      return this._generateBtnMarkup('prev', currPage);
    }

    // Page 1 and NO other pages
    // Results fit one pagination/segmentation
    return '';
  }

  _generateBtnMarkup(direction, currPageNum) {
    const previousBtnMarkup = `
    <button data-go-to-page="${
      currPageNum - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${iconsSVG}.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${currPageNum - 1}</span>
    </button>
    `;

    const nextBtnMarkup = `
    <button data-go-to-page="${
      currPageNum + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currPageNum + 1}</span>
        <svg class="search__icon">
        <use href="${iconsSVG}.svg#icon-arrow-right"></use>
        </svg>
    </button>
    `;

    let btnMarkup;
    if (direction === 'next') {
      btnMarkup = nextBtnMarkup;
    } else if (direction === 'prev') {
      btnMarkup = previousBtnMarkup;
    } else {
      //both
      btnMarkup = previousBtnMarkup.concat(nextBtnMarkup);
    }

    return btnMarkup;
  }
}

export default new PaginationView();
