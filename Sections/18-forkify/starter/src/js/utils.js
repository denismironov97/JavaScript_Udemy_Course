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

export const getJSONData = async function (endpoint) {
  try {
    const initialRes = await fetch(endpoint);

    if (!initialRes.ok) {
      throw new Error(
        `Initial server response failed -> status code: ${initialRes.status} status text: ${initialRes.statusText}!`
      );
    }

    const {
      data: { recipe },
    } = await initialRes.json();

    return recipe;
  } catch (err) {
    console.error(`Error from utils.js script file -> ${err.message}`);
  }
};

/*
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
*/
