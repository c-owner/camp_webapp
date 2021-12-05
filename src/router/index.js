import Vue from 'vue'
import {AuthCheck} from '@/mixins/Auth';
import VueRouter from 'vue-router'
import routes from "@/router/routes";

Vue.use(VueRouter)

// 라우터 정의
const router = new VueRouter({
  mode: 'history',
  routes: routes,
})


router.beforeEach(function (to, from, next) { // 토큰이 로컬스토리지에 담겼을 시 사용
                                              // to: 이동할 url에 해당하는 라우팅 객체
  if (to.matched.some(function (routeInfo) {
    return routeInfo.meta.authRequired;
  })) {
    let status = AuthCheck();
    if (status == 1) {
      next(); // 페이지 전환
    } else {
      //toke 삭제
      next({
        path : '/auth',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next(); // 페이지 전환
  };
});

export default router
