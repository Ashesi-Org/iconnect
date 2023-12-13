import axios from 'axios';

const baseURL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_PROD_API
  : import.meta.env.VITE_DEV_API;

const api = axios.create({
  baseURL,
  withCredentials: true, 
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
});

export { api, baseURL };
