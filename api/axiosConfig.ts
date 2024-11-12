import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5005/api', // используем базовый URL
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log('Token found and added to request:', token);  // Логируем токен
        config.headers['Authorization'] = `Bearer ${token}`;
    } else {
        console.log('No token found');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;