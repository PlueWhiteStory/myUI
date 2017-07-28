import Vue from 'vue'
// import router from "./router"
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import iview from "iview"
import "iview/dist/styles/iview.css"
import axios from "axios"
import qs from "qs"

Vue.use (ElementUI)
Vue.use (iview)
Vue.use (Vuex);
Vue.use (VueResource);
// axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded';
Vue.prototype.$qs = qs;
Vue.prototype.$ajax = axios;

const store = new Vuex.Store ({
  state: {
    id: 1045,//parent.vm1 ? parent.vm1.reportId : parent.layer.reportId, //
    recordId: 0,

  },
  apiUrl: 'http://www.sbdoc.cn:8080/mock/591cedf55fc39f361a85d80c', // http://127.0.0.1:8080/',
  mutations: {
    increment (state, n) {
      state.id = n;
    },
    setRecordId (state, n) {
      state.recordId = n;
    }
  },
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  template: '<App/>',
  components: { App }
})
