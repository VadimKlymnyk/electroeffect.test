import {axiosApiInstance} from './api.js'
import { message } from 'antd';



export async function signUp(data) {
    try {
        const response = await axiosApiInstance.post("/api/v1/users/", data);
        if(response.status === 201){
            message.success(response.statusText);
            return true
        }
    } catch (e) {
        message.error(e.message)
    }
    return false
}

export async function login(data) {
    try {
        const response = await axiosApiInstance.post(`/api-token-auth/`, data);
        if(response.status === 200){
            localStorage.setItem("token", response.data.token);
            return true
        }
    } catch (e) {
        message.error(e.message)
    }
    return false
    
}

export async function getTodo() {
    try {
        const response = await axiosApiInstance.get(`/api/v1/todo/`);
        if(response.status === 200){
            return JSON.parse(response.request.response)
        }
    } catch (e) {
        message.error(e.message)
    }
    return false
    
}

export async function addTodo(data) {
    try {
        const response = await axiosApiInstance.post(`/api/v1/todo/`, data);
        if(response.status === 201){
            message.success(response.statusText);
            return true
        }
    } catch (e) {
        message.error(e.message)
    }
    return false
}

export async function updateTodo(payload) {
    try {
        const response = await axiosApiInstance.put(`/api/v1/todo/${payload.id}/`, payload.data);
        if(response.status === 200){
            message.success(response.statusText);
            return true
        }
    } catch (e) {
        message.error(e.message)
    }
    return false  
}

export async function searchTodo(text) {
    try {
        const response = await axiosApiInstance.get(`/api/v1/todo/?search=${text}`);
        if(response.status === 200){
            console.log(JSON.parse(response.request.response))
            return JSON.parse(response.request.response)
        }
    } catch (e) {
        message.error(e.message)
    }
    return false  
}


