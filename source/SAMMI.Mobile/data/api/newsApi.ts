import axios from 'axios';

// Using a free mock API for news
const API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = '8e7de7b9d42a433d8f7ae1bb8d5f1664'; // This is a sample key, it's rate-limited

export const newsApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

// Add response interceptor for error handling
newsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);