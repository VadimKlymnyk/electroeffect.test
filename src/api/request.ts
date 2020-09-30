import {axiosApiInstance} from './api'
import { message } from 'antd';
import {requestTodo, signUpParams, loginParams} from '../utils/interfaces'




export async function signUp(data: signUpParams) {
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

export async function login(data: loginParams) {
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
    
}

export async function addTodo(data: requestTodo) {
    try {
        const response = await axiosApiInstance.post(`/api/v1/todo/`, data);
        if(response.status === 201){
            message.success(response.statusText);
            return response
        }
    } catch (e) {
        message.error(e.message)
    }
}

export async function updateTodo(payload:{id: string, data: requestTodo}) {
    try {
        const response = await axiosApiInstance.put(`/api/v1/todo/${payload.id}/`, payload.data);
        if(response.status === 200){
            message.success(response.statusText);
            return response
        }
    } catch (e) {
        message.error(e.message)
    }
}

export async function searchTodo(text: string) {
    try {
        const response = await axiosApiInstance.get(`/api/v1/todo/?search=${text}`);
        if(response.status === 200){
            console.log(JSON.parse(response.request.response))
            return JSON.parse(response.request.response)
        }
    } catch (e) {
        message.error(e.message)
    }
}


