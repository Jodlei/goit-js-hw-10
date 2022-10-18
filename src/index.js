import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';
import {
  createAllCountryMurkup,
  createOneCountryMurkup,
  refs,
} from '../src/js/createMurkup';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  const country = e.target.value.trim();
  if (country === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(country).then(resp => {
    managerOfContent(resp);
  });
}

function managerOfContent(data) {
  console.log(data);

  if (data.length > 10) {
    console.log(data.length);
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  if (data.length > 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    createAllCountryMurkup(data);
  }

  if (data.length === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    createOneCountryMurkup(data);
  }
}
