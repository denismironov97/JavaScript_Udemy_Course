import { customCreateElement } from './utils';

/*
// Construct the markup
const figure = customCreateElement(
  'figure',
  { class: ['recipe__fig'] },
  customCreateElement('img', {
    class: ['recipe__img'],
    src: 'src/img/test-1.jpg',
    alt: 'Tomato',
  }),
  customCreateElement(
    'h1',
    { class: ['recipe__title'] },
    customCreateElement('span', null, 'Pasta with tomato cream sauce')
  )
);

const recipeDetails = customCreateElement(
  'div',
  { class: ['recipe__details'] },
  customCreateElement(
    'div',
    { class: ['recipe__info'] },
    customCreateElement(
      'svg',
      { class: ['recipe__info-icon'] },
      customCreateElement('use', { href: 'src/img/icons.svg#icon-clock' })
    ),
    customCreateElement(
      'span',
      { class: ['recipe__info-data', 'recipe__info-data--minutes'] },
      '45'
    ),
    customCreateElement('span', { class: ['recipe__info-text'] }, 'minutes')
  ),
  customCreateElement(
    'div',
    { class: ['recipe__info'] },
    customCreateElement(
      'svg',
      { class: ['recipe__info-icon'] },
      customCreateElement('use', { href: 'src/img/icons.svg#icon-users' })
    ),
    customCreateElement(
      'span',
      { class: ['recipe__info-data', 'recipe__info-data--people'] },
      '4'
    ),
    customCreateElement('span', { class: ['recipe__info-text'] }, 'servings'),
    customCreateElement(
      'div',
      { class: ['recipe__info-buttons'] },
      customCreateElement(
        'button',
        { class: ['btn--tiny', 'btn--increase-servings'] },
        customCreateElement(
          'svg',
          null,
          customCreateElement('use', {
            href: 'src/img/icons.svg#icon-minus-circle',
          })
        )
      ),
      customCreateElement(
        'button',
        { class: ['btn--tiny', 'btn--increase-servings'] },
        customCreateElement(
          'svg',
          null,
          customCreateElement('use', {
            href: 'src/img/icons.svg#icon-plus-circle',
          })
        )
      )
    )
  ),
  customCreateElement(
    'div',
    { class: ['recipe__user-generated'] },
    customCreateElement(
      'svg',
      null,
      customCreateElement('use', { href: 'src/img/icons.svg#icon-user' })
    )
  ),
  customCreateElement(
    'button',
    { class: ['btn--round'] },
    customCreateElement(
      'svg',
      null,
      customCreateElement('use', {
        href: 'src/img/icons.svg#icon-bookmark-fill',
      })
    )
  )
);

const recipeIngredients = customCreateElement(
  'div',
  { class: ['recipe__ingredients'] },
  customCreateElement('h2', { class: ['heading--2'] }, 'Recipe ingredients'),
  customCreateElement(
    'ul',
    { class: ['recipe__ingredient-list'] },
    customCreateElement(
      'li',
      { class: ['recipe__ingredient'] },
      customCreateElement(
        'svg',
        { class: ['recipe__icon'] },
        customCreateElement('use', { href: 'src/img/icons.svg#icon-check' })
      ),
      customCreateElement('div', { class: ['recipe__quantity'] }, '1000'),
      customCreateElement(
        'div',
        { class: ['recipe__description'] },
        customCreateElement('span', { class: ['recipe__unit'] }, 'g'),
        'pasta'
      )
    ),
    customCreateElement(
      'li',
      { class: ['recipe__ingredient'] },
      customCreateElement(
        'svg',
        { class: ['recipe__icon'] },
        customCreateElement('use', { href: 'src/img/icons.svg#icon-check' })
      ),
      customCreateElement('div', { class: ['recipe__quantity'] }, '0.5'),
      customCreateElement(
        'div',
        { class: ['recipe__description'] },
        customCreateElement('span', { class: ['recipe__unit'] }, 'cup'),
        'ricotta cheese'
      )
    )
  )
);

const recipeDirections = customCreateElement(
  'div',
  { class: ['recipe__directions'] },
  customCreateElement('h2', { class: ['heading--2'] }, 'How to cook it'),
  customCreateElement(
    'p',
    { class: ['recipe__directions-text'] },
    'This recipe was carefully designed and tested by ',
    customCreateElement(
      'span',
      { class: ['recipe__publisher'] },
      'The Pioneer Woman'
    ),
    '. Please check out directions at their website.'
  ),
  customCreateElement(
    'a',
    {
      class: ['btn--small', 'recipe__btn'],
      href: 'http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/',
      target: '_blank',
    },
    customCreateElement('span', null, 'Directions'),
    customCreateElement(
      'svg',
      { class: ['search__icon'] },
      customCreateElement('use', { href: 'src/img/icons.svg#icon-arrow-right' })
    )
  )
);

// Constructed recipe
const fragment = new DocumentFragment();
fragment.append(figure, recipeDetails, recipeIngredients, recipeDirections);
*/
