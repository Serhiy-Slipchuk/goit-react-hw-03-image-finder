import axios from 'axios';

export const getImagesFromPixabayAPI = async function (querry, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  const searchParams = {
    q: querry,
    page: page,
    key: '34764215-86b3c445ef0af6c105776f540',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  };

  const response = await axios.get(BASE_URL, { params: searchParams });

  return response;
};
