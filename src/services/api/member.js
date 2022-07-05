import {get, post, put, del} from 'services/api/index.js';
import axios from "axios";
import {apiUrl} from "services/config.js";

export const authCheck = (token) => {
    return get('/auth');
}
export const login = (url, params) => {
    // return axios.post(apiUrl + url, params);
    return axios.post('http://localhost/api/v1' + url, params);
}
