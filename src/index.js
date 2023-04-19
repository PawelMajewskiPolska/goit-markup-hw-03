import Notiflix from 'notiflix';
/* import axios from 'axios'; */
import getAllPictures from './fetchPictures';
import renderPictures from './renderPictures';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';

const qs = s => document.querySelector(s);

const searchButton = qs('button');

const form = qs('form');

const textPicture = qs('input');

const displayGallery = qs('.gallery');

const buttonLoadMore = qs('.load-more');

buttonLoadMore.classList.add('is-hidden');

let page;
const perPage = 40;

const updateSessionStorage = () => {
  sessionStorage.removeItem('totalAmountofPhotos');
};

const getPhotos = async e => {
  try {
    e.preventDefault();

    displayGallery.innerHTML = '';
    page = 1;

    const pictures = await getAllPictures(perPage, page);
    const { totalHits: totalAmountofPhotos, hits: allPhotos } = pictures;

    (async () =>
      await localStorage.setItem(
        'totalAmountofPhotos',
        JSON.stringify(`${totalAmountofPhotos}`)
      ))();
    let seat = JSON.parse(localStorage.getItem('totalAmountofPhotos'));

    /* 
        pobieranie i ustawianie wartości totalPages do sessionStorage */

    sessionStorage.setItem('totalAmountofPhotos', `${totalAmountofPhotos}`);

    if (totalAmountofPhotos === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.info(`Hooray! We found ${totalAmountofPhotos} images.`);
    }

    renderPictures(allPhotos);
    const limit = totalAmountofPhotos / perPage;
    if (limit > 1) {
      const container = document.getElementById('pagination');
      const options = {
        totalItems:
          totalAmountofPhotos /* wartość totalPages z sessionStorage */,
        itemsPerPage: perPage,
        visiblePages: 10,
        page: 1,
        centerAlign: false,
        firstItemClassName: 'tui-first-child',
        lastItemClassName: 'tui-last-child',
        template: {
          page: '<a href="#" class="tui-page-btn">{{page}}</a>',
          currentPage:
            '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
          moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
          disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
          moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>',
        },
      };
      const pagination = new Pagination('pagination', options);
      pagination.on('afterMove', getMorePictures);
    }

    const name = qs('input');
    name.value = '';
  } catch {
    console.log('error');
  }
};

/* pobieranie wartości totalPages z sessionStorage */

form.addEventListener('submit', getPhotos);
form.addEventListener('submit', updateSessionStorage);

const getMorePictures = async () => {
  displayGallery.innerHTML = '';
  const currentPage = document.querySelector('.tui-is-selected');
  const currentPageToDisplay = currentPage.textContent;

  try {
    page = currentPageToDisplay;
    const pictures = await getAllPictures(perPage, page);
    const { totalHits: totalAmountofPhotos, hits: allPhotos } = pictures;
    const limit = totalAmountofPhotos / perPage;

    renderPictures(allPhotos);

    if (limit < page) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );

      const name = qs('input');
      name.value = '';
    }
  } catch {
    console.log('error');
  }
};
