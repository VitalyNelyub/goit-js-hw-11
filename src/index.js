import Notiflix from 'notiflix';
const axios = require('axios').default;

const form = document.getElementById('search-form');
const formInputValue = document.querySelector('.search-form input');
const cardList = document.querySelector('.gallery');
// console.log(formInputValue.value);
form.addEventListener('submit', getValue);

function getValue(e) {
  e.preventDefault();
  // const URL = `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${valueFromInput}&image_type=photo&orientation=horizontal&safesearch=true`;
  valueFromInput = formInputValue.value;
  console.log(valueFromInput);
  axios
    .get(
      `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${valueFromInput}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => {
      response.data.hits;
      console.log(response.data.hits);
      renderGallery(response.data.hits);
    });
}

// const URL = `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${valueFromInput}&image_type=photo&orientation=horizontal&safesearch=true`;

// let valueFromInput = null;
// fetchPhoto()

// axios
//   .get(URL)
//   .then(response => {
//     response.data.hits;
//     console.log(response.data.hits);
//     renderGallery(response.data.hits);
//   })
//   ;

// renderGallery();

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
