'use strict';

import { async } from 'regenerator-runtime';

export const state = {
  recipe: undefined,
};

export const loadRecipeData = async function (id) {
  try {
    const initialRes = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    if (!initialRes.ok) {
      throw new Error(
        `Initial server response failed -> status code: ${initialRes.status} status text: ${initialRes.statusText}!`
      );
    }

    const {
      data: { recipe },
    } = await initialRes.json();

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
