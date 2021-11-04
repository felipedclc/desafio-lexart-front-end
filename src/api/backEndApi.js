import axios from 'axios';

const backEndApi = axios.create({
  baseURL: 'http://localhost:3001/',
});

export default backEndApi;
