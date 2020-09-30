import { forwardTo } from '../utils/utils';

const axios = require('axios');
export const axiosApiInstance  = axios.create({baseURL: "http://ec2-18-219-246-237.us-east-2.compute.amazonaws.com:7778"});

axiosApiInstance.interceptors.request.use(
    config => {
        const token = localStorage.token;
        if (config.url.includes("/todo/")) {
            config.headers['Authorization'] = `Token ${token}`;
        }        
        return config;
    },
    error => {
        console.log(error)
        throw new Error(error)
    });

axiosApiInstance.interceptors.response.use(
    
    async config => {
      return config;
    },
    error => {
        console.log(error.response.status)
        if(error.response.status === 401){
            localStorage.removeItem('token');
            forwardTo('/login')
        }
        throw new Error(error)
    }
  );

