import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const API_URL = `https://restcountries.com/v3.1/name/`;

const filteredFields = '?fields=name,capital,population,flags,languages';
const searchEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

searchEl.addEventListener(
  'input',
  debounce(event => {
    const inputEv = event.target.value.trim();
    fetchCountries(`${API_URL}${inputEv}${filteredFields}`)
      .then(data => {
        if (data.length > 10) {
          listEl.innerHTML = '';
          infoEl.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        } else if (data.length === 1) {
            infoEl.innerHTML = '';
            countryInfo(data);
            listEl.innerHTML = '';
            infoEl.innerHTML = htmlStringInfo;
            return;
        }
        htmlStringList = '';
        countryList(data);
        infoEl.innerHTML = '';
        listEl.innerHTML = htmlStringList;
        
      })
      .catch(error => {
        listEl.innerHTML = '';
        infoEl.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name')
      });
  }, DEBOUNCE_DELAY)
);

let htmlStringList = '';
function countryList(data) {
  data.forEach(e => {
    htmlStringList += `<li class="list-item">
        <img src="${e.flags.svg}" alt="${e.flags.alt}" class="list-flag" width = "30"/>
        <p class="list-text">${e.name.common}</p>
    </li>`;
  });
}

let htmlStringInfo = '';
function countryInfo(data) {
    const capital = data[0].capital[0]
    const population = data[0].population
    const languages = data.map((data) => `${Object.values(data.languages)}`);
    
    htmlStringInfo = `<img src="${data[0].flags.svg}" alt="${data[0].flags.alt}" class="info-flag" height = "40"/>
    <h1>${data[0].name.common}</h1>
    <p><b>Capital: </b>${capital}</p>
<p><b>Population: </b>${population}</p>
<p><b>Languages: </b>${languages}</p>`
}

listEl.addEventListener('click', (event) => {
const fullName = event.target.textContent;
const fullTextParam = 'fullText=true';
setTimeout(() => {searchEl.value = fullName}, 400);//to hide fetching time

fetchCountries(`${API_URL}${fullName}${filteredFields}&${fullTextParam}`)
.then(data => {
  infoEl.innerHTML = '';
  countryInfo(data);
  listEl.innerHTML = '';
  infoEl.innerHTML = htmlStringInfo;
    return;
})
.catch(error => {
  listEl.innerHTML = '';
  infoEl.innerHTML = '';
  Notiflix.Notify.failure('Oops, there is no country with that name')
})

})