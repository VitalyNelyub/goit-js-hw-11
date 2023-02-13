import Notiflix from 'notiflix';
const axios = require('axios').default;

const form = document.getElementById('search-form');
const formInputValue = document.querySelector('.search-form input');
const cardList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// console.log(formInputValue.value);
form.addEventListener('submit', getValue);
// loadMore.addEventListener('click', loadMoreCards)

function getValue(e) {
  e.preventDefault();
  const URL = `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${formInputValue.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=1`;

  axios.get(URL).then(response => {
    response.data.hits;
    console.log(response.data.hits);
    if (response.data.hits.length === 0 || formInputValue.value === '') {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderGallery(response.data.hits);
      formInputValue.value = '';
    }
  });
}

function renderGallery(hits) {
  hits.map(hits => {
    cardList.innerHTML += `<div class="photo-card">
  <img src="${hits.webformatURL}" alt="${hits.tags}" loading="lazy" />
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
