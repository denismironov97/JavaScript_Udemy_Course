'use strict';

const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';

// API Key to make authorized requests or requests that change data or mutate in some sort of way on the backend database.
const API_KEY = '1550d749-f40d-41d7-a7cd-d36f9979f9e3';

const TIMEOUT_SECONDS = 10;

const RESULTS_PER_PAGE = 10;

const PAGINATION_LOAD_DELAY = 500;

const MODAL_CLOSE_DELAY = 2000;

export {
  API_URL,
  TIMEOUT_SECONDS,
  RESULTS_PER_PAGE,
  PAGINATION_LOAD_DELAY,
  API_KEY,
  MODAL_CLOSE_DELAY,
};
