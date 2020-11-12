const addMovieModal = document.getElementById('add-modal');
const addBtnTop = document.querySelector('header button');

const toggleMovieModal = (modal) => {
    addMovieModal.classList.toggle('visible');
};

addBtnTop.addEventListener('click', toggleMovieModal);