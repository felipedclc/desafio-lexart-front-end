import axios from 'axios';

const backEndApi = axios.create({
  baseURL: process.env.REACT_API_URL_NODE,
});

const webScrapPython = axios.create({
  baseURL: process.env.REACT_API_URL_FLASK,
});

export { backEndApi, webScrapPython };
