import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from "axios";

// 创建axios实例​
export const service = axios.create({
    baseURL: `http://47.115.212.79:81/`,
    timeout: 20000, // 超时时间​
    withCredentials: true, // 是否允许带cookie​
});

// 添加请求拦截器​
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // 在发送请求之前做些什么​
        config.headers['Access-Control-Allow-Origin'] = '*';
        const token = window.localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    // 对请求错误做些什么
    (error) => Promise.reject(error)
);

// 添加响应拦截器​
service.interceptors.response.use(
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么​
    (response: AxiosResponse) => response,
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    (error) => Promise.reject(error)
);

export default service;