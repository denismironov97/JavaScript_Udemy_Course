'use strict';

//Polyfilling ES features
import 'core-js/stable';

//Polyfilling async/await
import 'regenerator-runtime/runtime';

//Model
import * as model from '../js/model.js';

//Views
import recipeView from '../js/views/recipeView.js';

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

const init = function () {
  //Subscriber
  recipeView.addHandlerRender(controlRecipes);
};

init();
