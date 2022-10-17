import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {
  fetchCountries,
  refs,
  createAllCountryMurkup,
  createOneCountryMurkup,
} from '../src/js/fetchCountries';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  if (e.target.value === '') {
    return;
  }
  const name = e.target.value.trim();
  fetchCountries(name);
}
