import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const API_URL = `https://restcountries.com/v3.1/name/`;
const searchParams = new URLSearchParams({
  _limit: 10,
  _sort: 'name',
});
const filteredFields = '?fields=name,capital,population,flags,languages';
const searchEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

searchEl.addEventListener(
  'input',
  debounce(event => {
    const inputEv = event.target.value.trim();
    console.log(inputEv);
    return fetch(`${API_URL}${inputEv}${filteredFields}&${searchParams}`)
      .then(response => {
        if (!response.ok && inputEv) {
          listEl.innerHTML = '';
          Notiflix.Notify.failure('Oops, there is no country with that name');
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.length > 10) {
          listEl.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        htmlStringList = '';
        console.log(data.length, data[0].name.official, data[0].flags.svg);
        countryList(data);
        listEl.innerHTML = `${htmlStringList}`;
      })
      .catch(error => console.log(error));
  }, DEBOUNCE_DELAY)
);

let htmlStringList = '';
function countryList(data) {
  data.forEach(e => {
    htmlStringList += `<li class="list-item">
        <img src="${e.flags.svg}" class="list-flag" height = "20"/>
        <p class="list-text">${e.name.official}</p>
    </li>`;
  });
}
