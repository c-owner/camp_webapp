import axios from 'axios'
import {apiURL} from "./index.js";

const onUnauthorized = () => {
};

const RESULTCODE = {
    INVALIDE_PARAMETER: "INVALID_PARAMETER",
    SUCCEEDED: "SUCCEEDED",
    ERROR: "ERROR"
}
export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
};

export const request = {
    get(path, params=null) {
        return axios.get(`${apiURL + path}`, {params: params})
            .then(res => {
                if(res.data.ResultCode === RESULTCODE.INVALIDE_PARAMETER) {
                    alert("문제가 발생했습니다. 다시 시도해주세요.");
                    return res;
                }
                else return res;
            }).catch(({response}) => {
                const {status} = response;
                if (status === 400 || status === 401 || status === 500){
                    return onUnauthorized();
                }else {
                    alert("잘못된 정보입니다.")
                }
                throw Error(response)
            })
    },
    post(path, data) {
        return axios.post(`${apiURL + path}`, data)
            .then(res => {
                if(res.data.ResultCode === RESULTCODE.INVALIDE_PARAMETER) {
                    alert("문제가 발생했습니다. 다시 시도해주세요.");
                    // window.location.reload(true)
                    return res;
                }
                else return res;
            })
            .catch(({response}) => {
                const {status} = response;
                if (status === 400 || status === 401 || status === 500){
                    return onUnauthorized();
                }else {
                    alert("잘못된 정보입니다.")
                }
                throw Error(response)
            })
    }
};
