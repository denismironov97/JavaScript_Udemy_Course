'use strict';

import { TIMEOUT_SECONDS } from './config.js';

export const getJSONData = async function (endpoint) {
  try {
    const timeoutPromiseWrapper = requestTimeout(TIMEOUT_SECONDS);

    const initialServerRes = fetch(endpoint);

    // Promise race condition between fetch data request and wrapped promise timeout.
    const promiseResult = await Promise.race([
      initialServerRes,
      timeoutPromiseWrapper,
    ]);

    if (!promiseResult.ok) {
      throw new Error(
        `Initial server response failed -> status code: ${promiseResult.status} status text: ${promiseResult.statusText}!`
      );
    }

    const {
      data: { recipe },
    } = await promiseResult.json();

    return recipe;
  } catch (error) {
    console.error(`Error from utils -> ${error.message}`);
    throw error;
  }
};

// https://forkify-api.herokuapp.com/v2
const requestTimeout = function (seconds) {
  return new Promise(function executor(_, reject) {
    setTimeout(function callback() {
      reject(
        new Error(
          `Request took too long! Timeout after ${seconds} seconds passed.`
        )
      );
    }, seconds * 1000);
  });
};

export function customCreateElement(tagEl, attributes = undefined, ...params) {
  const element = document.createElement(tagEl);
  const textValue = params[0];

  //TextContent or Value
  if (params.length === 1 && typeof textValue !== 'object') {
    const targetProperty = ['input', 'textarea', 'select'].includes(tagEl)
      ? 'value'
      : 'textContent';
    tagEl[targetProperty] = textValue;
  } else {
    element.append(...params);
  }

  if (attributes) {
    const { class: classArr, ...otherAttributes } = attributes;

    // Set all attributes except 'class'
    for (const [currKey, currValue] of Object.entries(otherAttributes)) {
      element.setAttribute(currKey, currValue);
    }

    // Adding classes
    classArr?.forEach(currClass => element.classList.add(currClass));
  }

  return element;
}
