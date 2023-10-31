'use strict';

const bodyEl = document.querySelector('body');
const modalBoxEl = document.querySelector('.modal');
const closeBtnEl = document.querySelector('.close-modal');
const overlayComponentEl = document.querySelector('.overlay');

bodyEl.addEventListener('keydown', keydownHandler);
bodyEl.addEventListener('click', clickHandler);

closeBtnEl.addEventListener('click', closeModalComponent);

document.querySelectorAll('.show-modal').forEach(btn =>
  btn.addEventListener('click', function (ev) {
    // Open/Show Modal window component
    ev.stopPropagation();

    modalBoxEl.classList.remove('hidden');
    overlayComponentEl.classList.remove('hidden');
  })
);

function closeModalComponent(ev) {
  ev.stopPropagation();

  modalBoxEl.classList.add('hidden');
  overlayComponentEl.classList.add('hidden');
}

function keydownHandler(evArg) {
  const keyBtn = evArg.key;
  if (
    keyBtn === 'Escape' &&
    !modalBoxEl.classList.contains('hidden') &&
    !overlayComponentEl.classList.contains('hidden')
  ) {
    closeModalComponent(evArg);
  }
}

function clickHandler(ev) {
  if (ev.target === overlayComponentEl) {
    closeModalComponent(ev);
  }
}
