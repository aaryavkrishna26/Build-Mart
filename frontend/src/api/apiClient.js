import axios from 'axios';

// 👉 Replace this URL with your Railway backend URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://build-mart-production-a9e7.up.railway.app"; // <-- CHANGE IF NEEDED

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// 👉 Attach token automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
