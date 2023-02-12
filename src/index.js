import Notiflix from 'notiflix';
const axios = require('axios').default;

const form = document.getElementById('search-form');
const formInputValue = document.querySelector('.search-form input');
console.log(formInputValue.value);

const URL = `https://pixabay.com/api/?key=33583955-ce9811140fd4e045deb42856a&q=${formInputValue.value}&image_type=photo&orientation=horizontal&safesearch=true`;

const finder = axios.get(URL).then(response => {
  console.log(response);
});
