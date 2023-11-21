import axios from 'axios';

const api = axios.create({
  baseURL:"http://localhost:8000",
    // process.env.NODE_ENV === 'development'
    //   ? process.env.REACT_APP_DEV_API
    //   : process.env.REACT_APP_PROD_API,
  withCredentials: true,
});

export { api };