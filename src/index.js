import Notiflix from 'notiflix';
const axios = require('axios').default;

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const formInputValue = document.querySelector('.search-form input');
const cardList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let inputCurrentValue = '';

form.addEventListener('submit', getFetch);
loadMoreBtn.addEventListener('click', loadMoreCards);

async function getFetch(e) {
  e.preventDefault();
  cardList.innerHTML = '';
  page = 1;
  if (formInputValue.value !== '') {
    const backData = await axios.get(
      `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${formInputValue.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    if (backData.data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      formInputValue.value = '';
    } else {
      inputCurrentValue = formInputValue.value;
      formInputValue.value = '';
      renderCards(backData);
      loadMoreBtn.classList.remove('is-hidden')
    }
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    formInputValue.value = '';
  }
}

function renderCards(backData) {
  let dataPhotoArray = backData.data.hits;
  const cardForRender = dataPhotoArray
    .map(
      dataPhotoArray => `<div class="photo-card">
    <a class="gallery__item" href="${dataPhotoArray.largeImageURL}"><img src="${
        dataPhotoArray.webformatURL
      }" alt="${dataPhotoArray.tags.toUpperCase()}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${dataPhotoArray.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${dataPhotoArray.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${dataPhotoArray.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${dataPhotoArray.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join();

  cardList.insertAdjacentHTML('beforeend', cardForRender);
  page += 1;
  if (dataPhotoArray.length === 0) {
    Notiflix.Notify.warning('This is all photo');
    loadMoreBtn.disabled = true;
    lightBox.refresh();
  }
  lightBox.refresh();
}

async function loadMoreCards() {
  const backData = await axios.get(
    `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${inputCurrentValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  renderCards(backData)
}

let lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
