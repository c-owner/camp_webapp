import {apiUrl} from '../config';
import axios from 'axios';


export const get = (url, params) => {
    return axios.get(apiUrl + url, {params});
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
