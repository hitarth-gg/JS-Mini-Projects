'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// query selector below will only select the first button
// const btnsOpenModal = document.querySelector('.show-modal');

// this will create a node list with all buttons in it (kind of like an array), now we can iterate through this nodeList
const btnsOpenModal = document.querySelectorAll('.show-modal');

const closeModal = function () {
  //to add a class to an HTML element
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  // we can remove multiple classes by separating classes with comma like : ('hidden', 'class2')
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

//notice that we writing `closeModal` here instead of `closeModal()` because JS engine will execute `closeModal()`  as soon as it reaches this function whether we click on the button or not. Whereas `closeModal` will only execute the function when we click the button
btnCloseModal.addEventListener('click', closeModal);

//to close the modal when we click outside the modal box (i.e. on the overlay)
overlay.addEventListener('click', closeModal);

/* -------------- escape key to close modal ------------- */

// we are basically listening for an event everywhere on the page

// keydown = anykey
document.addEventListener('keydown', function (e) {
  //to know which key was pressed by seeing the even handler object
  // console.log(e);

  console.log(e.key); // to log which key was pressed

  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      closeModal();
    }
  }
});

document.addEventListener('Escape', closeModal);
/* ------------------------------------------------------ */
