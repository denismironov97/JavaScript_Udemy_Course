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
