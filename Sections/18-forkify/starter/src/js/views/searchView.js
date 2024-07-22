class SearchView {
  #parentElement = document.querySelector('.search');
  #searchInputElement;

  constructor() {
    this.#searchInputElement =
      this.#parentElement.querySelector('.search__field');
  }

  // Publisher
  addHandlerSearch(handlerFn) {
    this.#parentElement.addEventListener('submit', handlerFn);
  }

  getSearchQuery() {
    const searchQuery = this.#searchInputElement.value;
    this.#clearSearch();
    return searchQuery;
  }

  #clearSearch() {
    this.#searchInputElement.value = '';
  }
}

export default new SearchView();
