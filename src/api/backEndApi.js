import axios from 'axios';

const backEndApi = axios.create({
  baseURL: process.env.REACT_API_BACK_URL || 'http://localhost:3001/',
});

export async function webScrapPython(product) {
  const urlApi = `http://localhost:5000/${product}`;
  const products = await fetch(urlApi);
  // console.log('poducts', products.json());
  return products.json();
}

export default backEndApi;
