import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

let state={
  appConfig:0,
  userInfo:null
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
