/**
 * Created by u on 2017/7/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import  actions from './actions'
import mutations from './mutations'
import state from './state'

// 导入各个模块的初始状态和 mutations
Vue.use(Vuex)
export default new Vuex.Store({
  // 组合各个模块
  state,
  mutations,
  actions,
  getters:{
    tabs:state=>state.tabs,

  }
})
