import { forwardTo } from '../utils/utils';
import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

// const  = require('axios');
export const axiosApiInstance: AxiosInstance  = axios.create({baseURL: "http://ec2-18-219-246-237.us-east-2.compute.amazonaws.com:7778"});

axiosApiInstance.interceptors.request.use(
    (config: any) => {
        const token = localStorage.token;
        if (config.url.includes("/todo/")) {
            config.headers['Authorization'] = `Token ${token}`;
        }        
        return config;
    },
    (error: any) => {
        console.log(error)
        throw new Error(error)
    });

axiosApiInstance.interceptors.response.use(
    
    (config: AxiosResponse) => {
        return config;
    },
    (error: any) => {
        console.log(error.response.status)
        if(error.response.status === 401){
            localStorage.removeItem('token');
            forwardTo('/login')
        }
        throw new Error(error)
    }
  );

