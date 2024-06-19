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
    classArr.forEach(currClass => element.classList.add(currClass));
  }
}
