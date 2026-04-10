import axios from 'axios';

// API Base URL configuration
// Environment variable: REACT_APP_API_URL
// Default values:
//   - Local development: http://localhost:5000/api
//   - Production: https://build-mart-production-a9e7.up.railway.app/api
const getBaseURL = () => {
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (isLocalhost) {
    return 'http://localhost:5000/api';
  }
  return 'https://build-mart-production-a9e7.up.railway.app/api';
};

const API_URL = getBaseURL();

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies in requests
});

// Add auth token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error handling interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data if token is invalid
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_URL };
