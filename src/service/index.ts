import axios, { AxiosInstance } from 'axios';

const service: AxiosInstance = axios.create({
    baseURL: '',
    timeout: 5000
});

service.interceptors.request.use(config => config, err => err);

service.interceptors.response.use(config => config, err => err);

export default service;
