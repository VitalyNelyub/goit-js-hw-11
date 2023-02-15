import Notiflix from 'notiflix';
const axios = require('axios').default;

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const formInputValue = document.querySelector('.search-form input');
const cardList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// const gallery = document.querySelector('.gallery');

let page = 1;
let inputCurrentValue = '';
loadMoreBtn.disabled = true;

form.addEventListener('submit', createCards);
loadMoreBtn.addEventListener('click', loadMoreCards);

function createCards(e) {
  e.preventDefault();
  cardList.innerHTML = '';
  page = 1;
  let URL = `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${formInputValue.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  axios.get(URL).then(response => {
    response.data.hits;
    // console.log(response.data.hits);
    inputCurrentValue = formInputValue.value;
    page += 1;
    console.log(page);
    if (response.data.hits.length === 0 || formInputValue.value === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      formInputValue.value = '';
    } else {
      renderGallery(response.data.hits);
      formInputValue.value = '';
      loadMoreBtn.disabled = false;
    }
  });
}

function renderGallery(hits) {
  hits.map(hits => {
    cardList.innerHTML += `<div class="photo-card">
    <a class="gallery__item" href="${hits.largeImageURL}"><img src="${hits.webformatURL}" alt="${hits.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${hits.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hits.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hits.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hits.downloads}</b>
    </p>
  </div>
</div>`;
  });
}

function loadMoreCards() {
  formInputValue.value = inputCurrentValue;
  let URL = `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${formInputValue.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  axios.get(URL).then(response => {
    response.data.hits;
    console.log(response.data.hits);
    page += 1;
    console.log(page);
    renderGallery(response.data.hits);
    formInputValue.value = '';
    if (response.data.hits.length === 0) {
      Notiflix.Notify.warning('This is all photo');
      loadMoreBtn.disabled = true;
    }
  });
}

const lightbox = new SimpleLightbox('.gallery', {
  captionsData: 'alt',
  captionDelay: 250,
});

// var gallery = $('.gallery__item a').simpleLightbox();

// gallery.next(); // Next Image

// function createCards(e) {
//   e.preventDefault();
//   cardList.innerHTML = '';
//   if (formInputValue.value === '') {
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   } else {
//     let URL = `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${formInputValue.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
//     axios.get(URL).then(response => {
//       response.data.hits;
//       inputCurrentValue = formInputValue.value;
//       page += 1;
//       console.log(page);
//       renderGallery(response.data.hits);
//       formInputValue.value = '';
//       loadMoreBtn.disabled = false;
//     });
//   }
// }
