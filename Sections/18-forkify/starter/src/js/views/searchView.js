'use strict';

import View from './parentView.js';

class SearchView extends View {
  _searchInputElement;

  constructor() {
    super();

    this._parentElement = document.querySelector('.search');
    this._searchInputElement =
      this._parentElement.querySelector('.search__field');
  }

  // Publisher
  addHandlerSearch(handlerFn) {
    this._parentElement.addEventListener('submit', handlerFn);
  }

  getSearchQuery() {
    const searchQuery = this._searchInputElement.value;
    this._clearSearch();
    return searchQuery;
  }

  _clearSearch() {
    this._searchInputElement.value = '';
  }
}

export default new SearchView();
