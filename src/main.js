import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import _ from "lodash";
import API from '@/api/index'
import moment from 'moment';
import VueMomentJs from 'vue-momentjs';
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ko'
import 'element-ui/lib/theme-chalk/index.css'
import VModal from 'vue-js-modal';
import 'expose-loader?$!expose-loader?jQuery!jquery'
import Storage from 'vue-web-storage';

window.$ = require('jquery')
Vue.use(VueMomentJs, moment);
Vue.use(VModal);
Vue.use(API)
Object.defineProperty(Vue.prototype, "$_", { value: _ });
Vue.config.productionTip = false;
Vue.use(Storage, {
  prefix: 'com.corner.campfire_web', // default `app_`
  drivers: ['local'], // default 'local'
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
