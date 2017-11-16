// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iView'
import  Vuex from 'vuex'
import 'iview/dist/styles/iview.css'
import store from './components/eova/store/index.js'
import axios from './components/eova/js/axios'
import './components/eova/css/treeicon.css'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(iView);
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})
