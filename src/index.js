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
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      renderMarkup(countries);
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function clearFields() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderMarkup(countries) {
  if (countries.length > 1) {
    const markup = countries
      .map(({ name: { common }, flags: { svg } }) => {
        return `<li class="country-list__item">
          <img class="country-list__img" src="${svg}" alt="${common}">
          <p class="country-list__name">${common}</p>
        </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
  } else {
    clearFields();
    const {
      name: { official },
      capital,
      population,
      flags: { svg },
      languages,
    } = countries[0];

    const languagesList = Object.values(languages);

    refs.countryInfo.innerHTML = `
          <img class="country-info__img" src="${svg}" alt="${official}">
          <h2 class="country-info__title">${official}</h2>
          <p class="country-info__field"><b>Capital: </b>${capital}</p>
          <p class="country-info__field"><b>Population: </b>${population}</p>
          <p class="country-info__field"><b>Languages: </b>${languagesList}</p>
        `;
  }
}
