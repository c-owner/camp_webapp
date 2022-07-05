import {apiUrl} from '../config';
import axios from 'axios';


export const get = (url, params) => {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    // return axios.get(apiUrl + url, {headers: headers, params: params});
    return axios.get('http://localhost/api/v1' + url, {headers: headers, params: params});
}
export const post = (url, data) => {
    return axios.post(apiUrl + url, data);
}
export const put = (url, data) => {
    return axios.put(apiUrl + url, data);
}
export const del = (url) => {
    return axios.delete(apiUrl + url);
}
