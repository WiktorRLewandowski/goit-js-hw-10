import './css/styles.css';
import debounce from 'lodash.debounce'

const DEBOUNCE_DELAY = 300;
const API_URL = `https://restcountries.com/v3.1/name/`
const searchEl = document.getElementById("search-box");
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');
let countryName = "";

searchEl.addEventListener('input', (ev) => {            
    return fetch(`${API_URL}${ev.currentTarget.value}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    })

function fetchCountries(name) {
    return fetch(`${API_URL}${name}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
}
console.log(countryName)
fetchCountries();

// function processCountries()

