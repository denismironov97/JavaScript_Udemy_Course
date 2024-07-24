'use strict';

//Polyfilling ES features
import 'core-js/stable';

//Polyfilling async/await
import 'regenerator-runtime/runtime';

//Model
import * as model from '../js/model.js';

//Views
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

//Hot module reloading
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function (event) {
  const recipeId = window.location.hash.slice(1);

  try {
    if (!recipeId) {
      //throw new Error('Missing hash to perform id request');
      return;
    }

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

    resultsView.render(model.state.search.results);
  } catch (error) {
    console.error(`Error from controller -> ${error.message}`);
  }
};

const init = function () {
  // Subscriber - recipeView
  recipeView.addHandlerRender(controlRecipes);

  // Subscriber - searchView
  searchView.addHandlerSearch(controlSearchResults);
};

init();
