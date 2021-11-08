import axios from 'axios';

const backEndNode = axios.create({
  baseURL: 'https://felipe-desafio-lexart-back-end.herokuapp.com',
});

const webScrapFlask = axios.create({
  baseURL: 'https://desafio-lexart-web-scraping.herokuapp.com',
});

export { backEndNode, webScrapFlask };
