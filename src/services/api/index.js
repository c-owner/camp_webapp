import {apiUrl} from '../config';
import axios from 'axios';


export const get = (url, params) => {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    // return axios.get(apiUrl + url, {headers: headers, params: params});
    return axios.get('http://localhost/api/v1' + url, {headers: headers, params: params});
}
export const post = (url, params) => {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    return axios.post(apiUrl + url, {headers: headers, params: params});
}
export const put = (url, params) => {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    return axios.put(apiUrl + url, {headers: headers, params: params});
}
export const del = (url, params) => {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    return axios.delete(apiUrl + url, {headers: headers, params: params});
}
