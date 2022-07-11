import {get, post, put, del} from 'services/api/index.js';
import axios from "axios";
import {apiUrl} from "services/config.js";

export const authCheck = async () => {
    return await get('/auth').then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.log(err)
    });
}
export const login = async (url, params) => {
    return axios.post(apiUrl + url, params);
    // return await axios.post('http://localhost/api/v1' + url, params);
}


