import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from '../src/js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  if (e.target.value === '') {
    return;
  }
  fetchCountries(e.target.value);
}
