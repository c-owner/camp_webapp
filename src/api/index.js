import Vue from 'vue';
import {request, setAuthInHeader} from "@/api/request";
// import {req} from "vuelidate/src/validators/common";


Vue.prototype.$api = {
    $auth: { // 계정 로그인 / 회원가입 api
        login(params) {
            return request.post(`member/login`, params).then(({data}) => data);
        },
        findPw(params) {
            return request.post('member/send/passwd', params).then(({data}) => data);
        },
        // naverLogin(params) {
        //     return request.post(`sns/naver/code`, params).then(({data}) => data);
        // },
        // kakaoLogin(params) {
        //     return request.post(`sns/kakao/code`, params).then(({data}) => data);
        // },
    },
    $handler: {
        authHeader : setAuthInHeader
    },
    $member: {
        getList(params) {
            return request.get('member', params).then(({data}) => data);
        },
        getMainList(params) {
            return request.get('member/main', params).then(({data}) => data);
        },
        getInfo(params) {
            return request.get('member/info', params).then(({data}) => data);
        },
        getMember(params) {
            return request.get('member', params).then(({data}) => data);
        },
        checkEmailDuplicate(params) {
            return request.get('member/chk/id', params).then(({data}) => data);
        },
        checkNickDuplicate(params) {
            return request.get('member/chk/nick', params).then(({data}) => data);
        },
        createMember(params) {
            return request.post('member', params).then(({data}) => data);
        },
        updateMember(params) {
            return request.post('member/update', params).then(({data}) => data);
        },
        updateRecommend(params) {
            return request.post('member/service/recommend', params).then(({data}) => data);
        },
        updateAccount(params) {
            return request.post('member/account', params).then(({data}) => data);
        },
        updateNick(params) {
            return request.post('member/service/change/ni', params).then(({data}) => data);
        },
        updatePwd(params) {
            return request.post('member/service/change/pwd', params).then(({data}) => data);
        },
        sendMail(params) {
            return request.post('member/send/certify', params).then(({data}) => data);
        },
        getMail(params) {
            return request.post('member/get/certify', params).then(({data}) => data);
        },
        getProfile(params) {
            return request.get('member/profile', params).then(({data}) => data);
        },
        toggleLike(params) {
            return request.post(`follow/like/toggle`, params).then(({data}) => data);
        },
        updateProfile(params) {
            return request.post(`member/profile/update`, params).then(({data}) => data);
        },
        getCreatorLike(params) {
            return request.get(`follow/like`, params).then(({data}) => data);
        },
        deleteMember(params) {
            return request.post(`member/delete`, params).then(({data}) => data);
        },

    },
  /*  $board: {
        getNotice(params) {
            return request.get("board/notice", params).then(({data}) => data);
        },
        getQna(params) {
            return request.get("board/qna", params).then(({data}) => data);
        },
        createQna(params) {
            return request.post("board/qna", params).then(({data}) => data);
        },
        updateQna(params) {
            return request.post('board/qna/update', params).then(({data}) => data);
        },
        deleteQna(params) {
            return request.post("board/qna/delete", params).then(({data}) => data);
        },
        getCategory(params) {
            return request.get(`board/faq/category`, params).then(({data}) => data);
        },
        getFaq(params) {
            return request.get(`board/faq`, params).then(({data}) => data);
        },
    },*/
 /*   $alarm: {
        getAlarm(params) {
            return request.get('alarm/member', params).then(({data}) => data);
        },
        readAlarm(params) {
            return request.post('alarm/member/read', params).then(({data}) => data);
        },
        deleteAlarm(params) {
            return request.post('alarm/member/delete', params).then(({data}) => data);
        }
    },*/
  /*  $config: {
        getGroup(params) {
            return request.get(`group`, params).then(({data}) => data);
        },
        getBanner(params) {
            return request.get(`banner`, params).then(({data}) => data);
        },

    },*/
    $terms: {
        getTerms(params) {
            return request.get(`config`, params).then(({data}) => data);
        },

    },
    $file: {
        getFile(params) {
            return request.get("file", params).then(({data}) => data);
        },
        editorUpload(params) {
            return request.post("file/editorUpload", params).then(({data}) => data);
        },
        download(params) {
            return request.get("download", params).then(({data}) => data);
        },
        copyFile(params) {
            return request.post(`file/copy`, params).then(({data}) => data);
        }
    },
};

export default Vue.prototype.$api;
