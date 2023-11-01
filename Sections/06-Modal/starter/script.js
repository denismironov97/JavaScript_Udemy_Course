'use strict';

const bodyEl = document.querySelector('body');
const modalBoxEl = document.querySelector('.modal');
const closeBtnEl = document.querySelector('.close-modal');
const overlayComponentEl = document.querySelector('.overlay');

// Anonymous function
// Open/Show Modal window component
document.querySelectorAll('.show-modal').forEach(btn =>
  btn.addEventListener('click', function (ev) {
    ev.stopPropagation();

    modalBoxEl.classList.remove('hidden');
    overlayComponentEl.classList.remove('hidden');
  })
);

closeBtnEl.addEventListener('click', closeModalComponent);

overlayComponentEl.addEventListener('click', closeModalComponent);

bodyEl.addEventListener('keydown', keydownHandler);

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
