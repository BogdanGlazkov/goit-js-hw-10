import './css/styles.css';
import _debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', _debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(event) {
  clearFields();
  if (!event.target.value.trim()) {
    return;
  }
  fetchCountries(event.target.value.trim())
    .then(countries => {
      console.log(countries);
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function clearFields() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

console.log(refs.countryInfo);
