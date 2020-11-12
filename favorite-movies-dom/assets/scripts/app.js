const addMovieModal = document.getElementById('add-modal');
const addBtnTop = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddBtn = addMovieModal.querySelector('.btn--passive');

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const cancelAddMovie = () => {
    toggleMovieModal();
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

addBtnTop.addEventListener('click', toggleMovieModal);
cancelAddBtn.addEventListener('click', cancelAddMovie);
backdrop.addEventListener('click', backdropClickHandler);