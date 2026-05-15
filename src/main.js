import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

let searchQuery = '';
let currentPage = 1;
let loadedImages = 0;
const perPage = 40;

hideLoadMoreBtn();
hideEndMessage();

form.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();

  searchQuery = input.value.trim();

  if (!searchQuery) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  currentPage = 1;
  loadedImages = 0;

  clearGallery();
  hideLoadMoreBtn();
  hideEndMessage();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage, perPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
        timeout: 4000,
        maxWidth: '432px',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
      });
      return;
    }

    createGallery(data.hits);
    loadedImages += data.hits.length;

    checkEndOfCollection(data.totalHits);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 4000,
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function onLoadMoreClick() {
  currentPage += 1;

  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage, perPage);

    createGallery(data.hits);
    loadedImages += data.hits.length;

    smoothScroll();
    checkEndOfCollection(data.totalHits);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 4000,
    });
  } finally {
    hideLoader();
  }
}

function checkEndOfCollection(totalHits) {
  if (loadedImages >= totalHits) {
    hideLoadMoreBtn();
    showEndMessage();

    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      timeout: 4000,
    });

    return;
  }

  showLoadMoreBtn();
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');

  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}

function showEndMessage() {
  endMessage.classList.remove('is-hidden');
}

function hideEndMessage() {
  endMessage.classList.add('is-hidden');
}