'use strict';

//Polyfilling ES features
import 'core-js/stable';

//Polyfilling async/await
import 'regenerator-runtime/runtime';

//Model
import * as model from '../js/model.js';

//Config
import { PAGINATION_LOAD_DELAY } from './config.js';

//Views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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

    // Update resultsView to mark selected search result/recipe
    resultsView.updateRender(model.getPaginatedSearchResult());

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
  // Not bookmarked we add bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.updateRender(model.state.recipe);
};

const init = function () {
  // Subscriber - recipeView
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
};
init();
