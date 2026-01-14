// Mock API Service
import axios from 'axios';
import { Capacitor } from '@capacitor/core';

const isElectron = !!(window.process && window.process.versions && window.process.versions.electron);
const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const isNative = Capacitor?.isNativePlatform?.() ?? false;

let baseURL;

if (isNative) {
  baseURL = 'https://rehanaforflowers.com/api';
} else if (isElectron || isLocalhost) {
  baseURL = 'http://localhost:3001/api';
} else {
  baseURL = '/api';
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const whatsappApi = {
  getStatus: () => api.get('/whatsapp/status'),
  logout: () => api.post('/whatsapp/logout')
};

export default api;
