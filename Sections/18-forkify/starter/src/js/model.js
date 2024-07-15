'use strict';

import { async } from 'regenerator-runtime';

import { API_URL } from './config.js';
import { getJSONData } from './utils.js';

export const state = {
  recipe: undefined,
};

export const loadRecipeData = async function (id) {
  try {
    const recipe = await getJSONData(`${API_URL}/${id}`);

    console.log('warTooth', recipe);

    const regExPattern = /_([a-z])/g;
    const replacementString = function (_, letter) {
      return letter.toUpperCase();
    };

    const convertToCamelCase = str => {
      return str.replace(regExPattern, replacementString);
    };

    const recipeData = Object.entries(recipe).reduce(
      (acc, [currKey, value]) => {
        const newKey = convertToCamelCase(currKey);
        acc[newKey] = value;
        return acc;
      },
      {}
    );

    state.recipe = recipeData;
  } catch (error) {
    console.error(error.message);
  }
};
