import {get, post, put, del} from 'services/api/index.js';

export const authCheck = (token) => {
    return get('/auth');
}
