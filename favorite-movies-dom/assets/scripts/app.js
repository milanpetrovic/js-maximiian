const addMovieModal = document.getElementById('add-modal');
const addBtnTop = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddBtn = addMovieModal.querySelector('.btn--passive');
const addMovieBtn = cancelAddBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
};

const clearUserInputs = () => {
    for (usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearUserInputs();
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

    const newMovie = {
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearUserInputs();
};

const backdropClickHandler = () => {
    toggleMovieModal();
    clearUserInputs();
};

addBtnTop.addEventListener('click', toggleMovieModal);
cancelAddBtn.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
addMovieBtn.addEventListener('click', addMovieHandler);