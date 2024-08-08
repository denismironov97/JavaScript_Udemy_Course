'use strict';

//Importing svg-s from source dir to use them in distribution dir
import iconsSVG from 'url:../../img/icons.svg';
import View from './parentView.js';
import previewView from './previewView.js';

class bookmarksPanelView extends View {
  constructor() {
    super();

    this._parentElement = document.querySelector('.bookmarks__list');
    this._errorMessage =
      'No bookmarks yet. Find a nice recipe and bookmark it.';
  }

  //Publisher-s
  addLoadHandlerForBookmarks(handlerCallbackFn) {
    window.addEventListener('load', handlerCallbackFn);
  }

  _generateMarkup() {
    const bookmarkEls = this._data
      .map(currBookmarkEl => {
        return previewView.render(currBookmarkEl, false);
      })
      .join('');

    return bookmarkEls;
  }

  /*
  _generateMarkupPreview({ publisher, imageUrl, title, id }) {
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
  */
}

export default new bookmarksPanelView();
