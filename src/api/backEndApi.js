import axios from 'axios';

const backEndApi = axios.create({
  baseURL: process.env.REACT_API_BACK_URL || 'http://localhost:3001/',
});

export default backEndApi;
