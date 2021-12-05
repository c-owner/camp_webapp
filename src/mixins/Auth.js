import Vue from 'vue'
import store from '@/store/'
import {request, setAuthInHeader} from "@/api/request";
import VueJWT from "vuejs-jwt";
import util from '@/mixins/util';
import EventBus from "@/utils/event-bus";

let JwtOption = {
    signKey: '',
    storage: 'localStorage',
    keyName: 'com.dgmonglab.election_webtoken',  //token 꼭 붙여주세요.
    ignoreExpiration: false,       // set true to ignore expiration date
    ignoreNotBefore: false,       // set true to ignore 'not before' date
}
Vue.use(VueJWT, JwtOption)

let wcsTimer = [];
export const  getStorageToken =() => { // 토큰 가져오기
    let token = Vue.$jwt.getToken();
    var regex = /"/gi;
    if(!token){
        return null;
    }
    let jwtToken = token.replace(regex,'');
    return jwtToken
}

export const getTokenObj =() => { // 토큰 가져오기
    if(Vue.$jwt.hasToken()){
        let jwtToken = getStorageToken();
        let tokenObject = Vue.$jwt.decode(jwtToken,JwtOption.signKey);
        if(jwtToken && tokenObject ){
            return tokenObject;
        } else if(jwtToken){
            return -1;
        }else {
            return null;
        }
    }else {
        return null;
    }

}

export const AuthCheck =() => { // 토큰이 로컬스토리지에 담겼을 시 사용

    let tokenObj = getTokenObj();
    if(tokenObj && tokenObj.hasOwnProperty('mb_no')){
        return 1;
    }else if( tokenObj == -1 ){ //토큰값이 다를경우 토큰 지우고 null
        logout();
        return null;
    }else{
        return null;
    }


};

function getSuccess(storeSet,storeCount) {
    let finishCount = 0;
    let success = false;
    return function() {
        util.Array.each(storeSet, (item,index,storeSet) => {
            if(item.status == 'finish'){
                finishCount++
            }
        });
        success = (storeCount == finishCount) ? true : false
        return success;
    };
}

export const StoreProcess =(to, from, next) => { // 토큰이 로컬스토리지에 담겼을 시 사용
    //스토어가 필수 조건이 아니면 진행
    if(!to.meta.storeRequired){
        next();
    }
    let params = to.params;
    let query = to.query;
    let configs = to.meta.storeConfig;

    let storeSet = [];
    let wcsTimerCnt = 0;
    util.Object.each(configs, (index,value,configs) => {
        if(value){
            let obj = {
                'name': index,
                'required' : value,
                'params' : params,
                'query' : query,
                'status' : 'ready',
                'try' : 0,
                'max' : 8   //max는 5을 넘을 수 없습니다.
            }
            storeSet.push(obj)
        }
    });

    let storeCount = storeSet.length;
    let isSuccess = storeCheck(storeSet, next)
    if( isSuccess ){
        // clearInterval(wcsTimer);
        removeAllInterval();
        next();
        return false;
    }
    let wcsTimers = setInterval(function (){
        if(wcsTimerCnt <= 8 ) { // 0.5초 동안 리트라이 총 시도 횟수
            let isSuccess = storeCheck(storeSet, next)
            if( isSuccess ){
                // clearInterval(wcsTimer);
                removeAllInterval();
                next();
            }
            wcsTimerCnt++;
        } else {
            clearInterval(wcsTimer);
            next('/auth')
        }
    }.bind(this), 500);
    wcsTimer.push(wcsTimers);
};

function storeCheck(storeSet, next) {
    let storeCount = storeSet.length;
    util.Array.each(storeSet, (item,index,storeSet) => {
        if(item.status != 'finish'){
            item = storeRunning(item);
        }
        if(item.name == 'checkFinish' && item.status == 'fail') {
            removeAllInterval();
            next('/setinfo');
        }else if(item.status == 'fail'){  //하나라도 실패할 경우 인증으로
            removeAllInterval();
            next('/auth') //
        }
    });

    let isSuccessFn = getSuccess(storeSet,storeCount);  //클로저 형태로 펑션을 리턴합니다. 펑션자체에 if 걸지마세요 항상 true입니다.
    let isSucess = isSuccessFn();
    return isSucess;
};

function removeAllInterval() {
    for (let i = 0; i< wcsTimer.length; i++) {
        clearInterval(wcsTimer[i]);
    }
    wcsTimer = [];
}

function storeRunning(storeItem){
    if(storeItem.name == 'userInfo'){
        return AuthPayLoad(storeItem);
    }else if(storeItem.name === 'checkFinish') {
        return CheckFinishLogin(storeItem)
    }else if(storeItem.name === 'nftUser') {
        return CheckNftUser(storeItem)
    }else{
        return storeItem
    }


}


export const AuthPayLoad =(storeItem) => { // 토큰이 로컬스토리지에 담겼을 시 사용
    if(!storeItem.required) {
        storeItem.status = 'finish'
        return storeItem;
    }

    if(store.getters['userInfo/getUserInfo'] != undefined && store.getters['userInfo/getUserInfo'].mb_no){
        storeItem.status = 'finish'
    }else{
        if( storeItem.try >= storeItem.max ){
            storeItem.status = 'fail'
        }else{
            storeItem.status = 'run'
            storeItem.try++;
        }
    }
    return storeItem;
};
export const CheckFinishLogin = (storeItem) => {
    if(store.getters['userInfo/getUserInfo'] != undefined && store.getters['userInfo/getUserInfo'].mb_is_verify === 1) {
        storeItem.status = 'finish';
    }else{
        if( storeItem.max <= storeItem.try) {
            storeItem.status = 'fail';
        }else{
            storeItem.status = 'run';
            storeItem.try++;
        }
    }
    return storeItem;
}


export const CheckNftUser = (storeItem) => {
    if(store.getters['userInfo/getUserInfo'] != undefined && store.getters['userInfo/getUserInfo'].mb_nft_token) {
        storeItem.status = 'finish';
    }else{
        let jwtToken = getStorageToken();
        if( storeItem.max <= storeItem.try) {
            storeItem.status = 'fail';
        }else{
            storeItem.status = 'run';
            storeItem.try++;
            if(storeItem.try == 1){
                store.dispatch( 'userInfo/setNftUser', {token : jwtToken } );
            }
        }
    }
    return storeItem;
}

export const storeSet =(to, from, next) => { // 토큰이 로컬스토리지에 담겼을 시 사용
    // to: 이동할 url에 해당하는 라우팅 객체
    // console.log('storeSet start')
    if (to.matched.some(function(routeInfo) {
        return routeInfo.meta.storeRequired;
    })) {
        // 이동할 페이지에 인증 정보가 필요하면 경고 창을 띄우고 페이지 전환은 하지 않음
        let jwtToken = getStorageToken();
        let userInfoStatus = store.getters['userInfo/getUserInfo'].mb_no;
        if ( !userInfoStatus ) {
            let tokenObj = getTokenObj();
            if(tokenObj === -1) {
                logout();
            }
            if(tokenObj && tokenObj.hasOwnProperty('mb_no')){
                store.dispatch( 'userInfo/setUserInfo', {token : jwtToken } );
                StoreProcess(to, from, next);
            }else{
                StoreProcess(to, from, next);
            }
        } else {
            StoreProcess(to, from, next);
        }
    } else {
        next(); // 페이지 전환
    };
};

export const authPageCheck =(to, from, next) => { // 인증 페이지 설정.
    // to: 이동할 url에 해당하는 라우팅 객체
    let tokenObj = getTokenObj();
    if(tokenObj && tokenObj.hasOwnProperty('mb_no')){
        next('/');
    }else{
        next();
    }
};

export const snsRegisterSet = (type) => {
    Vue.$localStorage.set('snsType', type);
}


export const loginTokenSet = (token) => {
    Vue.$localStorage.set('token', token);
    setAuthInHeader(token);
}

export const logout = () => {
   /* let socialType = userInfo.Social;
    if(!util.isEmpty(socialType) && socialType.social_type === 'google') {
        googleLogout();
    }*/
    Vue.$localStorage.clear();
    setAuthInHeader('');
    location.href = '/';
}
