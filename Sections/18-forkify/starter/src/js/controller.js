'use strict';

//Polyfilling ES features
import 'core-js/stable';

//Polyfilling async/await
import 'regenerator-runtime/runtime.js';
import { async } from 'regenerator-runtime';

//Model
import * as model from '../js/model.js';

//Views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksPanelView from './views/bookmarksPanelView.js';

//Config
import { PAGINATION_LOAD_DELAY } from './config.js';

//Hot module reloading
/*
if (module.hot) {
  module.hot.accept();
}
*/

const controlRecipes = async function (event) {
  const recipeId = window.location.hash.slice(1);

  try {
    if (!recipeId) {
      //throw new Error('Missing hash to perform id request');
      return;
    }

    //debugger;

    // Update resultsView to mark selected search result/recipe
    resultsView.updateRender(model.getPaginatedSearchResult());

    // Update bookmarksPanelView
    bookmarksPanelView.updateRender(model.state.bookmarks);

    //Rendering spinner animation before loading and rendering the recipe
    recipeView.renderSpinnerAnimation();

    // 1) Loading Recipe Data
    await model.loadRecipeData(recipeId);

    //  2) Rendering recipe view
    recipeView.render(model.state.recipe);

    console.log(model.state.recipe);
  } catch (error) {
    console.error(`Error from controller -> ${error.message}`);
  }
};

const controlSearchResults = async function (event) {
  event.preventDefault();

  try {
    //Rendering spinner animation before loading and rendering the query food recipes
    resultsView.renderSpinnerAnimation();

    // 1) Get search query from user
    const queryString = searchView.getSearchQuery();

    if (!queryString) {
      return;
    }

    // 2) Loading search query results, awaiting async operation
    await model.loadSearchResults(queryString);

    // 3) Render search results
    console.log('Recipes:');
    console.log(model.state.search.results);
    //resultsView.render(model.state.search.results);
    resultsView.render(model.getPaginatedSearchResult());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(`Error from controller -> ${error.message}`);
  }
};

const controlPagination = function (goToPageNumber) {
  try {
    resultsView.renderSpinnerAnimation();

    setTimeout(() => {
      // 1) Render NEW/Next segmentation recipe results
      resultsView.render(model.getPaginatedSearchResult(goToPageNumber));

      // 2) Render NEW pagination number buttons
      paginationView.render(model.state.search);
    }, PAGINATION_LOAD_DELAY);
  } catch (error) {
    console.error(`Error from controller -> ${error.message}`);
  }
};

const controlServings = function (newServingsNumber) {
  try {
    // Update recipe servings quantity
    model.updateServings(newServingsNumber);

    // Rerender whole recipe View with the modified recipe ingredients quantity data
    recipeView.updateRender(model.state.recipe);
  } catch (error) {
    console.error(`Error from controller -> ${error.message}`);
  }
};

const controlRecipeBookmark = function () {
  // 1) Add/Remove bookmark
  // Not bookmarked we add bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2) Update recipe view
  recipeView.updateRender(model.state.recipe);

  // 3) Render bookmarks panel
  bookmarksPanelView.render(model.state.bookmarks);
};

const controlBookmarksOnLoad = function () {
  /*
  const bookmarksData = JSON.parse(localStorage.getItem('bookmarks'));

  // if (!bookmarksData) {
  //   return;
  // }

  // Short-circuiting operation
  bookmarksData && bookmarksPanelView.render(bookmarksData);
  */

  bookmarksPanelView.render(model.state.bookmarks);
};

const init = function () {
  // Subscriber - recipeView + bookmarksPanelView
  recipeView.addHandlerRender(controlRecipes);
  /*
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controllerAddBookmark);
  */
  recipeView.addHandlers(controlServings, controlRecipeBookmark);

  // Subscriber - searchView
  searchView.addHandlerSearch(controlSearchResults);

  // Subscriber - paginationView
  paginationView.addHandlerClick(controlPagination);

  // Subscriber - bookmarksView
  bookmarksPanelView.addLoadHandlerForBookmarks(controlBookmarksOnLoad);
};
init();
