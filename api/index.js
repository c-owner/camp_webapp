import Vue from 'vue';
import {request, setAuthInHeader} from "@/api/request";

Vue.prototype.$api = {
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

export default Vue.prototype.$api;
