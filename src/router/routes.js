import {storeSet, authPageCheck} from "@/mixins/Auth.js"
import Vue from 'vue'
import VueRouter from 'vue-router'

function setViewResolver(component) {
    return require('../views/' + component).default;
}

const layout = {
    render(h) {
        return h('router-view')
    }
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(() => {
        return window.location.reload()
    })
};


export default [
    {
        path: '/', // 메인
        component: setViewResolver('Home'),
        name : 'Home',
        beforeEnter: (to, from, next) => {
            storeSet(to, from, next);
        },
        meta: {name: 'Home', title: '',  storeRequired:true, transitionName: 'none',},
    },
    { // 없는 페이지일 경우 홈으로 이동
        path: '*',
        redirect: '/',
    },
]
