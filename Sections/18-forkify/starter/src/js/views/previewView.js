'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';
import View from './parentView.js';

// Class used to generate only one preview view element.
class previewView extends View {
  constructor() {
    super();

    //this._parentElement = '';
  }

  _generateMarkup() {
    const { publisher, imageUrl, title, id } = this._data;

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

export default new previewView();
