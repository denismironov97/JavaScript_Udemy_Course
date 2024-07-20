'use strict';

import { async } from 'regenerator-runtime';

import { API_URL } from './config.js';
import { getJSONData, restructureObjectKeys } from './utils.js';

export const state = {
  recipe: undefined,
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
    const recipesData = await getJSONData(`${API_URL}?search=${queryString}`);

    console.log(recipesData);
  } catch (error) {
    console.error(`Error from model -> ${error.message}`);
    throw error;
  }
};

loadSearchResults('pizza');
