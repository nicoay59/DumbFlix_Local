import axios from 'axios';

// Create base URL API
export const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/",
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};


// process.env.REACT_APP_BASE_URL