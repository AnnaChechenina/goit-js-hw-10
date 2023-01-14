export { fetchCountries };
const BASE_URL = 'https://restcountries.com/v3.1/name';
const API_KEY = 'wiiC1XTzCFW-frhCHvRG';

function fetchCountries(name) {
  if (!name) {
    return;
  }
  return fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
