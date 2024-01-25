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

//--------------------------------------------------------------------------------------------------
//Implementing sticky navigation bar - Legacy Implementation
/*
const coordinatesFromTopToSection = section1.getBoundingClientRect().top;
window.addEventListener('scroll', function () {
  console.log();
  const currPosOfScrollOnPage = window.scrollY;
  if (currPosOfScrollOnPage > coordinatesFromTopToSection) {
    navElem.classList.add('sticky');
  } else {
    navElem.classList.remove('sticky');
  }
});
*/

//--------------------------------------------------------------------------------------------------
//Implementing sticky navigation bar - Intersection Observer API
const header = document.querySelector('.header');
const navHeight = navElem.getBoundingClientRect().height;

const optionsObj = {
  root: null,
  rootMargin: `${-navHeight}px`,
  threshold: 0,
};
const observerCallbackFn = function (entries, observerRef) {
  const [intersectionEntryObj] = entries;

  if (!intersectionEntryObj.isIntersecting) {
    navElem.classList.add('sticky');
  } else {
    navElem.classList.remove('sticky');
  }
};

const observerAPI = new IntersectionObserver(observerCallbackFn, optionsObj);
observerAPI.observe(header);

//--------------------------------------------------------------------------------------------------
//Implementing revealing elements/section on scroll
//First apply the section--hidden class to each section element
/*
const sections = document.querySelectorAll('section');
sections.forEach(section => section.classList.add('section--hidden'));

const revealSection = function (entries, observerRef) {
  const [entry] = entries;

  //Guard clause
  if (!entry.isIntersecting) {
    return;
  }

  entry?.target.classList.remove('section--hidden');

  observerRef.unobserve(entry?.target);
};

const sectionObserverOptionsObj = {
  root: null,
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  sectionObserverOptionsObj
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});
*/

//--------------------------------------------------------------------------------------------------
//Implementing lazy loading img-s
const imgs = document.querySelectorAll('img[data-src]');

const loadImgCallbackFn = function (entries, observerRef) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  }

  const targetElement = entry?.target;
  targetElement.src = targetElement.dataset.src;

  observerRef.unobserve(targetElement);
};

const imgObserverOptionsObj = {
  root: null,
  rootMargin: '100px',
  threshold: 0,
};

const imgObserver = new IntersectionObserver(
  loadImgCallbackFn,
  imgObserverOptionsObj
);

imgs.forEach(function (currImg) {
  imgObserver.observe(currImg);

  currImg.addEventListener('load', () => {
    console.log('loaded event triggered');

    //currImg variable is accessible because of closure
    currImg.classList.remove('lazy-img');
  });
});

//--------------------------------------------------------------------------------------------------
//Implementing sliding components slider elem and slides
const sliders = document.querySelectorAll('.slider .slide');

//Initial positioning of sliders on page load
sliders.forEach((currSlider, currIndex) => {
  currSlider.style.transform = `translateX(${currIndex * 100}%)`;
});

const dotsContainer = document.querySelector('.dots');
dotsContainer.addEventListener('click', dotHandler);

const createDotElement = function (indexArg) {
  const buttonElem = document.createElement('button');
  buttonElem.classList.add('dots__dot');
  buttonElem.dataset.slide = indexArg;

  return buttonElem;
};

const docFragment = new DocumentFragment();
for (let i = 0; i < sliders.length; i++) {
  docFragment.append(createDotElement(i));
}

dotsContainer.appendChild(docFragment);

toggleDotElement(document.querySelector('button[data-slide="0"]'));

const [leftBtn, rightBtn] = document.querySelectorAll('.slider button');

const shiftSlideElem = function (sliderIndexPos) {
  sliders.forEach((currSlider, currIndex) => {
    currSlider.style.transform = `translateX(${
      100 * (currIndex - sliderIndexPos)
    }%)`;
  });
};

let sliderIndexPos = 0;
const maxLength = sliders.length - 1;

const dotsContainerArr = [...document.querySelector('.dots').childNodes];

rightBtn.addEventListener('click', function () {
  if (sliderIndexPos === maxLength) {
    sliderIndexPos = 0;
  } else {
    sliderIndexPos++;
  }

  //-100%, 0%, 100%, 200% etc.
  /*
  sliders.forEach((currSlider, currIndex) => {
    currSlider.style.transform = `translateX(${
      100 * (currIndex - sliderIndexPos)
    }%)`;
  });
  */
  shiftSlideElem(sliderIndexPos);

  const dotElement = dotsContainerArr.find(function (currElem) {
    const dotIndex = Number(currElem.dataset.slide);
    return dotIndex === sliderIndexPos;
  });

  toggleDotElement(dotElement);
});

leftBtn.addEventListener('click', function () {
  sliderIndexPos = sliderIndexPos === 0 ? maxLength : --sliderIndexPos;

  shiftSlideElem(sliderIndexPos);

  const dotElement = dotsContainerArr.find(function (currElem) {
    const dotIndex = Number(currElem.dataset.slide);
    return dotIndex === sliderIndexPos;
  });

  toggleDotElement(dotElement);
});

const sliderComponent = document.querySelector('.slider');

const sliderOptionsObj = {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
};

let isSliderInView = false;
const sliderObserverCallbackFn = function (entries, observerRef) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    isSliderInView = true;
  } else {
    isSliderInView = false;
  }
};

const sliderObserver = new IntersectionObserver(
  sliderObserverCallbackFn,
  sliderOptionsObj
);
sliderObserver.observe(sliderComponent);

document.addEventListener('keydown', function (event) {
  if (!isSliderInView) {
    return;
  }

  const pressedButton = event.key;

  if (pressedButton !== 'ArrowRight' && pressedButton !== 'ArrowLeft') {
    return;
  }

  const arrowButton = {
    ArrowRight: rightBtn,
    ArrowLeft: leftBtn,
  };

  arrowButton[pressedButton].click();

  console.log('arrow event triggered');
});

//--------------------------------------------------------------------------------------------------
//Implementing dots components that work together with slider feature
function dotHandler(event) {
  if (event.target.tagName.toLowerCase() !== 'button') {
    return;
  }

  const dotElement = event.target;
  const slideIndex = Number(dotElement.dataset.slide);

  toggleDotElement(dotElement);

  shiftSlideElem(slideIndex);
}

function toggleDotElement(dotElement) {
  dotElement
    .closest('.dots')
    .querySelectorAll('button')
    .forEach(currDotElem => {
      currDotElem.classList.remove('dots__dot--active');
    });

  dotElement.classList.add('dots__dot--active');
}
