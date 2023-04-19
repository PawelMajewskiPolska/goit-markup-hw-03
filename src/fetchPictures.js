import axios from 'axios';

/* const request = axios.create({
  baseURL: 'https://pixabay.com/api/',
}); */

const qs = s => document.querySelector(s);
const name = qs('input');

const getAllPictures = async (perPage, page) => {
  const query = name.value.trim();
  const baseURL = 'https://pixabay.com/api/';

  try {
    const resp = await axios.get(baseURL, {
      params: {
        key: '30876928-2345e250fcd753bb575b4167a',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page,
      },
    });

    return await resp.data;
  } catch {
    console.log('error');
  }
};

export default getAllPictures;
