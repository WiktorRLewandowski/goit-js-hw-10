import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const API_URL = `https://restcountries.com/v3.1/name/`
const searchParams = new URLSearchParams({
    _limit: 10,
    _sort: "name",
});
const filteredFields = '?fields=name,capital,population,flags,languages'
const searchEl = document.getElementById("search-box");
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');
let countryName = "";

searchEl.addEventListener('input', debounce((event) => {
    const inputEv = event.target.value;  
    console.log(inputEv)    
    return fetch(`${API_URL}${inputEv}${filteredFields}${searchParams}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    }, DEBOUNCE_DELAY))

