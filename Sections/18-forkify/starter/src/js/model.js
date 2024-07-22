'use strict';

import { async } from 'regenerator-runtime';

import { API_URL } from './config.js';
import { getJSONData, restructureObjectKeys } from './utils.js';

export const state = {
  recipe: undefined,
  search: {
    query: undefined,
    results: [],
  },
};

export const loadRecipeData = async function (id) {
  try {
    const {
      data: { recipe },
    } = await getJSONData(`${API_URL}/${id}`);

    const restructuredRecipeData = restructureObjectKeys(recipe);

    state.recipe = restructuredRecipeData;
  } catch (error) {
    console.error(`Error from model -> ${error.message}`);
    throw error;
  }
};

export const loadSearchResults = async function (queryString) {
  try {
    const queriedRecipesData = await getJSONData(
      `${API_URL}?search=${queryString}`
    );

    const {
      data: { recipes: recipesArr },
      results: resultsNum,
      status,
    } = queriedRecipesData;

    const queriedRecipesArr = recipesArr.map(currRecipeObj =>
      restructureObjectKeys(currRecipeObj)
    );

    state.search.query = queryString;
    state.search.results = queriedRecipesArr;
  } catch (error) {
    console.error(`Error from model -> ${error.message}`);
    throw error;
  }
};
