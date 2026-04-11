import axios from 'axios';

// HARDCODED PRODUCTION URL - No localhost fallback!
// This is the ONLY URL that will ever be used
const API_BASE_URL = 'https://build-mart-production-a9e7.up.railway.app';

// FORCE log to ensure we're using correct URL
console.warn('⚠️ CRITICAL: Frontend API URL is:', API_BASE_URL);
console.error('🔗 ALL requests will go to:', API_BASE_URL);
console.log('🚀 API Client Initialized');
console.log('Environment:', process.env.NODE_ENV);
console.log('API Base URL:', API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };