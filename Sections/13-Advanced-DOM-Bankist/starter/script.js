'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(currBtnElem => {
  currBtnElem.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookie notification box and functionality
const cookieBox = document.createElement('div');
cookieBox.classList.add('cookie-message');
const cookieBoxMessage =
  'We use cookies for improved functionality and analytics.';

const cookieButton = document.createElement('button');
cookieButton.classList.add('btn', 'btn--close-cookie');
cookieButton.textContent = 'Got it!';

cookieButton.addEventListener('click', () => {
  cookieBox.remove();
});

cookieBox.append(cookieBoxMessage, cookieButton);

document.querySelector('header').prepend(cookieBox);

//Smooth scroll functionality for specific element - Legacy
const smoothScrollToSection = function (event) {
  const currDistanceFromTopViewportToSection =
    section1.getBoundingClientRect().y; //section1.getBoundingClientRect().top;

  const currPositionOfClientViewportFromTop = window.pageYOffset; //window.scrollY

  window.scrollTo({
    top:
      currDistanceFromTopViewportToSection +
      currPositionOfClientViewportFromTop,
    behavior: 'smooth',
  });
};

//Smooth scroll functionality for specific element - Modern
const smoothScrollToSectionModern = function (event) {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
};

document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', smoothScrollToSection);

const section1 = document.querySelector('#section--1');

//--------------------------------------------------------------------------------------------------
//Smooth scroll functionality generic Implementing navigation
const navigationEl = document.querySelector('.nav__links');

const navigateToSpecificSection = function (event) {
  event.preventDefault();

  const navElement = event.target;
  const navElemId = navElement.getAttribute('href');

  if (navElemId === '#' || navElement.tagName !== 'A') {
    return;
  }

  const correspondingSection = document.querySelector(navElemId);

  const currDistanceFromTopViewportToSection =
    correspondingSection?.getBoundingClientRect().y;

  const currPositionOfClientViewportFromTop = window.pageYOffset; //window.scrollY

  window.scrollTo({
    top:
      currDistanceFromTopViewportToSection +
      currPositionOfClientViewportFromTop,
    behavior: 'smooth',
  });
};

navigationEl.addEventListener('click', navigateToSpecificSection);

//Building a tabbed component
const operationsTabs = document.querySelectorAll(
  '.operations__tab-container .operations__tab'
);

const operationsContent = document.querySelectorAll(
  '.operations .operations__content'
);

const navigateTabbedComponent = function (event) {
  const element = event.target.closest('.operations__tab'); //Closest btn elem as parent

  //Guard clause
  if (!element) {
    return;
  }

  //Active Tab Btn Component
  operationsTabs.forEach(currTabElem =>
    removeSpecificClassFromElem(currTabElem, 'operations__tab--active')
  );
  element.classList.add('operations__tab--active');

  //Active Tab Content
  operationsContent.forEach(currContentElem =>
    removeSpecificClassFromElem(currContentElem, 'operations__content--active')
  );

  const contentTabNumber = element.dataset.tab;
  const operationContent = document.querySelector(
    `.operations__content--${contentTabNumber}`
  );
  operationContent.classList.add('operations__content--active');

  function removeSpecificClassFromElem(elementRef, stringClassToRemove) {
    elementRef.classList.remove(stringClassToRemove);
  }
};

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', navigateTabbedComponent);

//--------------------------------------------------------------------------------------------------
//Menu fade navigation
const navElem = document.querySelector('.nav');

const handleHover = function (event) {
  const element = event.target;
  if (!element.classList.contains('nav__link')) {
    return;
  }

  const logo = element.closest('.nav').querySelector('img');
  const siblings =
    element.parentElement.parentElement.querySelectorAll('.nav__link');
  siblings.forEach(navLinkElem => {
    if (navLinkElem !== element) {
      navLinkElem.style.opacity = this;
    }
  });

  logo.style.opacity = this;
};

navElem.addEventListener('mouseover', handleHover.bind(0.4));

navElem.addEventListener('mouseout', handleHover.bind(1));
