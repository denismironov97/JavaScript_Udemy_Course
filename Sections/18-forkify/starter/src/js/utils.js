'use strict';

import { TIMEOUT_SECONDS } from './config.js';

export const getJSONData = async function (endpoint) {
  try {
    const timeoutPromiseWrapper = requestTimeout(TIMEOUT_SECONDS);

    const initialServerResPromise = fetch(endpoint);

    // Promise race condition between fetch data request and wrapped promise timeout.
    const promiseResult = await Promise.race([
      initialServerResPromise,
      timeoutPromiseWrapper,
    ]);

    if (!promiseResult.ok) {
      throw new Error(
        `Initial server response failed -> status code: ${promiseResult.status} status text: ${promiseResult.statusText}!`
      );
    }

    const resultData = await promiseResult.json();

    return resultData;
  } catch (error) {
    console.error(`Error from utils -> ${error.message}`);
    throw error;
  }
};

export function restructureObjectKeys(obj) {
  if (Object.keys(obj).length === 0 || !obj) {
    throw new Error(
      'Provided object for key restructuring is either empty obj || null || undefined.'
    );
  }

  const regExPattern = /_([a-z])/g;

  const replacementString = function (_, letter) {
    return letter.toUpperCase();
  };

  const convertToCamelCase = str => {
    return str.replace(regExPattern, replacementString);
  };

  const restructuredObjectKeys = Object.entries(obj).reduce(
    (acc, [currKey, value]) => {
      const newKey = convertToCamelCase(currKey);
      acc[newKey] = value;
      return acc;
    },
    {}
  );

  return restructuredObjectKeys;
}

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
