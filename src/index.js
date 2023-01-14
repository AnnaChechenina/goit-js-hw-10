import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputSearch = document.getElementById('search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  const textInput = event.target.value.trim();
  deleteRenderMarkUp();

  if (textInput) {
    fetchCountries(textInput)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }
        if (countries.length >= 2) {
          createCountryList(countries);
        }
        if (countries.length === 1) {
          createCountryInfo(countries);
        }
        if (!textInput) {
          return;
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}
function deleteRenderMarkUp() {
  listCountry.innerHTML = '';
  infoCountry.innerHTML = '';
}

function createCountryList(countries) {
  const countryListMarkUp = countries
    .map(({ flags: { svg }, name: { official } }) => {
      return `<li><img src="${svg}" alt="${official}" width="60" ><h>${official}</h></li>`;
    })
    .join('');
  listCountry.innerHTML = countryListMarkUp;
}

function createCountryInfo(countries) {
  const countryInfoMarkUp = countries
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        population,
        languages,
      }) => {
        return `<img src="${svg}" alt="${official}"width="60"> <h2>${official}</h2>
      <p>Capital: ${capital[0]}</p>
<p>Population: ${population}</p>
<p>Languages: ${Object.values(languages)}</p >`;
      }
    )
    .join('');
  infoCountry.innerHTML = countryInfoMarkUp;
}
