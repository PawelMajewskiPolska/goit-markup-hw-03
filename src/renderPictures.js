import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';

const qs = s => document.querySelector(s);

const displayGallery = qs('.gallery');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captiondelay: 250,
});

/* const container = document.getElementById('pagination');

const options = {
  totalItems: 500,
  itemsPerPage: 10,
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

pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
}); */

/* pagination.on('beforeMove', event => {
  const currentPage = event.page;

  if (currentPage === 10) {
    return false;
    // return true;
  }
}); */

const renderPictures = allPhotos => {
  const markup = allPhotos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        views,
        likes,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
        <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
        <div class="info-item">
          <p class="info-item__text">${likes}</p>
            <p class="info-item__text" >Likes</p>
            </div>
            <div class="info-item__margin-left">
          <p class="info-item__text">${views}</p>
            <p class="info-item__text">Views</p>
            </div>
            <div class="info-item__margin-right">
          <p class="info-item__text">${comments}</p>
            <p class="info-item__text">Comments</p>
            </div>
            <div class="info-item">
          <p class="info-item__text">${downloads} </p>
          <p class="info-item__text">Downloads</p>
            </div>
        </div>
      </div>`;
      }
    )
    .join('');

  displayGallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

export default renderPictures;
