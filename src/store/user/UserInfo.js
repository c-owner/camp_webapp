import {request, setAuthInHeader} from "@/api/request";
import {logout} from "@/mixins/Auth";
import EventBus from "@/utils/event-bus";

const state = {
    UserInfo: {},
};

const getters = {
    getUserInfo: state => state.UserInfo,
};

const mutations = {
    updateUserInfo(state, obj) {
        state.UserInfo = obj.value;
    },
    resetUserInfo(state) {
        state.UserInfo = {};
    },
};

const actions = {
    setUserInfo({commit, rootState, dispatch}, {token}) {
        setAuthInHeader(token);
        let params = {}
        request.get('member/info', params)
            .then((res) => {
                let result = res.data.Data.Result;
                if (result.Info.type > 0 && result.List.length > 0) {
                    commit('updateUserInfo', {'value': result.List[0]})
                } else {
                    logout();
                    commit('updateUserInfo', {'value': {}})
                }

            }, () => {
                console.log('error');
                logout();
                commit('updateUserInfo', {'value': {}})
            })
    },

    setNftUser({commit, rootState, dispatch}, {token}) {
        setAuthInHeader(token);
        let params = {}
        request.post('nftuser', params)
            .then((res) => {
                let result = res.data.Data.Result;
                if (result.Info.type > 0) {
                    let userInfo = state.UserInfo;
                    // dispatch('setUserInfo', {token: token})
                    userInfo.mb_nft_token = result.List.mb_nft_token;
                    commit('updateUserInfo', {'value': userInfo})
                }

            }, () => {
                console.log('error');
            })
    },


    changeUserInfo({commit, rootState}, {data}) {
        commit('updateUserInfo', {'value': data});
    },
    initUserInfo({commit, rootState}, {data}) {
        commit('resetUserInfo');
    },
};

export default {namespaced: true, state, getters, mutations, actions}
