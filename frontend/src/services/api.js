import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updatePassword: (data) => API.put('/auth/update-password', data),
};

export const itemAPI = {
  getAllItems: () => API.get('/items'),
  getItemById: (id) => API.get(`/items/${id}`),
  createItem: (data) => API.post('/items', data),
  updateItem: (id, data) => API.put(`/items/${id}`, data),
  deleteItem: (id) => API.delete(`/items/${id}`),
  searchItems: (params) => API.get('/items/search/query', { params }),
  getMyItems: () => API.get('/items/user/my-items'),
};

export default API;
