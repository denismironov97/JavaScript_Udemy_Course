'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';

//Importing parent class - ParentView
import View from './parentView.js';

class ResultsView extends View {
  constructor() {
    super();

    this._parentElement = document.querySelector('.results');
    this._errorMessage = 'No recipes found from search. Please try again.';
  }

  _generateMarkup() {
    const searchQueryResults = this._data
      .map(this._generateListElementMarkup)
      .join('');

    return searchQueryResults;
  }

  _generateListElementMarkup({ publisher, imageUrl, title, id }) {
    const currUrlId = window.location.hash.slice(1);
    const activePreviewLinkClass =
      id === currUrlId ? 'preview__link--active' : '';

    const listElMarkup = `
    <li class="preview">
	    <a class="preview__link ${activePreviewLinkClass}" href="#${id}">
		    <figure class="preview__fig">
			    <img src="${imageUrl}" alt="${title}" />
		    </figure>
		    <div class="preview__data">
			    <h4 class="preview__title">${title}</h4>
			    <p class="preview__publisher">${publisher}</p>
			    <div class="preview__user-generated">

			    </div>
		    </div>
	    </a>
    </li>
    `;

    return listElMarkup;
  }
}

export default new ResultsView();
