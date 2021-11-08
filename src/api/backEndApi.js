import axios from 'axios';

const backEndNode = axios.create({
  baseURL: process.env.REACT_API_URL_NODE || 'http://localhost:3001',
});

const webScrapFlask = axios.create({
  baseURL: process.env.REACT_API_URL_FLASK || 'http://localhost:5000',
});

export { backEndNode, webScrapFlask };
