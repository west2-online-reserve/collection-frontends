import axios from 'axios';

export const service = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
});

service.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).token}`; // 解析 JSON 并提取 token
    }
    return config;
  },
  error => Promise.reject(error)
);

service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default service;
