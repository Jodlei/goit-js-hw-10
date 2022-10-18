export { fetchCountries, refs, createAllCountryMurkup, createOneCountryMurkup };
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

function fetchCountries(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        console.log(data.length);
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (data.length > 1) {
        createAllCountryMurkup(data);
      }
      console.log(data);
      if ((data.length = 1)) {
        createOneCountryMurkup(data);
      }
    })
    .catch(err => {
      console.log(err);
      Notiflix.Notify.info('Oops, there is no country with that name');
    });
}

function createAllCountryMurkup(data) {
  const murkup = data
    .map(el => {
      const {
        name: { official },
        flags: { svg },
      } = el;
      return `<li class="county-list__item">
        <img class="country-list__icon" src="${svg}" alt="${official} flag" width="50"
        height="50">
        <p class="country-list__name">${official}</p>
      </li>`;
    })
    .join('');

  refs.countryList.innerHTML = murkup;
}

function createOneCountryMurkup(data) {
  const murkup = data
    .map(item => {
      const {
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      } = item;
      return `<div class="country-info__box">
      <img
        class="country-list__icon"
        src="${svg}"
        alt="${official} flag"
        width="100"
        heigth="100"
      />
      <p class="country-list__name">${official}</p>
    </div>
    <ul class="info-list">
      <li class="info-list__item"><span class="info-list__accent">Capital:</span> ${
        capital[0]
      }</li>
      <li class="info-list__item"><span class="info-list__accent">Population:</span> ${population}</li>
      <li class="info-list__item"><span class="info-list__accent">Languages:</span> ${Object.values(
        languages
      ).join(', ')}</li>
    </ul>`;
    })
    .join('');

  refs.countryList.innerHTML = murkup;
}
