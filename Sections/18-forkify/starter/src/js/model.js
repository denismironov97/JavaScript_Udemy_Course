'use strict';

import { async } from 'regenerator-runtime';

import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config.js';
import {
  getJSONData,
  postSendJSONData,
  restructureObjectKeys,
  restructureObjectKeysForBackend,
} from './utils.js';

export const state = {
  recipe: undefined,
  search: {
    query: undefined,
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currPage: 1,
  },
  multipleIngredientServingsQty: [],
  bookmarks: [],
};

export const loadRecipeData = async function (idArg) {
  try {
    const {
      data: { recipe },
    } = await getJSONData(`${API_URL}/${idArg}?key=${API_KEY}`);

    const restructuredRecipeData = restructureObjectKeys(recipe);
    state.recipe = restructuredRecipeData;

    const isRecipeBookmarked = state.bookmarks.some(
      bookmark => bookmark.id === state.recipe.id
    );
    state.recipe.bookmarked = isRecipeBookmarked;
  } catch (error) {
    console.error(`Error from model -> ${error.message}`);
    throw error;
  }
};

export const loadSearchResults = async function (queryString) {
  try {
    const queriedRecipesData = await getJSONData(
      `${API_URL}?search=${queryString}&key=${API_KEY}`
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

//getSearchResultsPage
export const getPaginatedSearchResult = function (pageNumber = 1) {
  state.search.currPage = pageNumber;

  const startIndex = (pageNumber - 1) * state.search.resultsPerPage;
  const endIndex = pageNumber * state.search.resultsPerPage;

  const paginatedDataArr = state.search.results.slice(startIndex, endIndex);

  return paginatedDataArr;
};

export const updateServings = function (newServingsNum) {
  const oldServingsNum = state.recipe.servings;

  state.multipleIngredientServingsQty = state.recipe.ingredients.map(
    currIngObj => {
      if (!currIngObj.quantity) {
        return currIngObj;
      }

      // newIngQty = oldIngQty * newServingsNumber / oldServingsNumber
      const oldIngQty = currIngObj.quantity;
      const newIngQty = (oldIngQty * newServingsNum) / oldServingsNum;
      currIngObj.quantity = newIngQty;

      return currIngObj;
    }
  );

  state.recipe.ingredients = [...state.multipleIngredientServingsQty];
  state.recipe.servings = newServingsNum;
};

export const addBookmark = function (recipeObj) {
  // Add bookmark
  state.bookmarks.push(recipeObj);

  //Mark current recipe as bookmarked
  if (state.recipe.id === recipeObj.id) {
    state.recipe.bookmarked = true;
  }

  savePersistBookmarksData();
};

export const deleteBookmark = function (id) {
  // Delete bookmarked recipe
  const bookmarkIndex = state.bookmarks.findIndex(
    bookmarkedRecipe => bookmarkedRecipe.id === id
  );
  const deletedRecipe = state.bookmarks.splice(bookmarkIndex, 1)[0];
  // Has the same reference that points to Heap memory as state.recipe. Removed elem === state.recipe (same ref point in mem).

  // Mark current recipe NOT bookmarked
  if (state.recipe.id === id) {
    state.recipe.bookmarked = false;
  }

  savePersistBookmarksData();
};

//  persistBookmarks
const savePersistBookmarksData = function () {
  const stringifiedJSON = JSON.stringify(state.bookmarks);
  localStorage.setItem('bookmarks', stringifiedJSON);
};

export const uploadPostRecipe = async function (recipeDataObj) {
  const emptySpacesRegex = /\s+/g; // Improved regex to catch any whitespace, including tabs or multiple spaces.

  const ingredients = Object.entries(recipeDataObj)
    .filter(([propKey, propVal]) => {
      return propKey.startsWith('ingredient') && propVal.trim() !== '';
    })
    .map(([_, propVal]) => {
      const ingredientsArray = propVal.replace(emptySpacesRegex, '').split(',');

      if (ingredientsArray.length !== 3) {
        throw new Error(
          'Incorrect ingredient format. Please use correct ingredient format: "quantity,unit,description"'
        );
      }

      const [quantity, unit, description] = ingredientsArray;

      const ingData = {
        quantity: quantity ? Number(quantity) : null,
        unit,
        description,
      };

      return ingData;
    });

  const objPlaceholder = Object.fromEntries(
    Object.entries(recipeDataObj).filter(
      ([key, _]) => !key.startsWith('ingredient')
    )
  );
  const postRecipeData = {
    ...restructureObjectKeysForBackend(objPlaceholder),
    ingredients,
  };

  const postedDataRes = await postSendJSONData(
    `${API_URL}?key=${API_KEY}`,
    postRecipeData
  );

  // Nested obj destructuring
  const {
    data: { recipe },
    status,
  } = postedDataRes;

  const customRecipe = { status, ...restructureObjectKeys(recipe) };

  state.recipe = customRecipe;

  addBookmark(state.recipe);
};

//  Initialize bookmarks from locale storage on page load or reload. Initial load of app.
const initBmksFromStorage = function () {
  const bookmarksStorage = JSON.parse(localStorage.getItem('bookmarks'));

  /*
  if(!bookmarksStorage) {
    return;
  }
  */

  state.bookmarks = bookmarksStorage ?? state.bookmarks;
};
initBmksFromStorage();
