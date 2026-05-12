import axios from 'axios';

const api = axios.create({
  // Use Vite's environment variable if set, otherwise fallback to localhost for development
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000/api/' : 'https://bhagvatikitana-backend.vercel.app/api/'),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
