export { refs, createAllCountryMurkup, createOneCountryMurkup };

const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

function createAllCountryMurkup(data) {
  const murkup = data
    .map(item => {
      const {
        name: { official },
        flags: { svg },
      } = item;
      return `<li class="countryes-list__item">
        <img class="countryes-list__icon" src="${svg}" alt="${official} flag" width="100"
        height="100">
        <p class="countryes-list__name">${official}</p>
      </li>`;
    })
    .join('');

  refs.countryList.insertAdjacentHTML('afterbegin', murkup);
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
        class="one-country-list__icon"
        src="${svg}"
        alt="${official} flag"
        width="100"
        heigth="100"
      />
      <p class="one-country-list__name">${official}</p>
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

  refs.countryList.insertAdjacentHTML('afterbegin', murkup);
}
