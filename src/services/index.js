import {request, setAuthInHeader} from "./request";

const api = {
    $auth: {
        createMember(params) {
            return request.post('member', params).then(({data}) => data);
        },
    },
    $handler: {
        authHeader: setAuthInHeader
    },
    $member: {},
}

export default api