const addMovieModal = document.getElementById('add-modal');
const addBtnTop = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddBtn = addMovieModal.querySelector('.btn--passive');
const addMovieBtn = cancelAddBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }
};

const backdropClickHandler = () => {
    toggleMovieModal();
};

addBtnTop.addEventListener('click', toggleMovieModal);
cancelAddBtn.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
addMovieBtn.addEventListener('click', addMovieHandler);