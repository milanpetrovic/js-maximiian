const addMovieModal = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const addBtnTop = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddBtn = addMovieModal.querySelector('.btn--passive');
const addMovieBtn = cancelAddBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    movieList.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeleteMovieBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeleteMovieBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelDeleteMovieBtn.removeEventListener('click', closeMovieDeletionModal);
    confirmDeleteMovieBtn.replaceWith(confirmDeleteMovieBtn.cloneNode(true));
    confirmDeleteMovieBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelDeleteMovieBtn.addEventListener('click', closeMovieDeletionModal);
    confirmDeleteMovieBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating} / 5 stars</p>
    </div>
    `;

    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
    movieList.append(newMovieElement);
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const clearUserInputs = () => {
    for (usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearUserInputs();
    toggleBackdrop();
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
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    closeMovieModal();
    toggleBackdrop();
    clearUserInputs();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const backdropClickHandler = () => {
    closeMovieModal();
    clearUserInputs();
    closeMovieDeletionModal();
};

addBtnTop.addEventListener('click', showMovieModal);
cancelAddBtn.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
addMovieBtn.addEventListener('click', addMovieHandler);