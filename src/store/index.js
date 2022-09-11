import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// !npm查看下载
// !vuex-persistedstate ---持久化
// !1.下载
// !yarn add vuex-persistedstate@3.2.1
// !2.引入
// !import createPersistedState from 'vuex-persistedstate'
// !3.调用
// !plugins: [createPersistedState()],
// 配置项
// key 默认值是vuex
// storage 默认是本地存储
// reducer:指定持久化那些数据，函数，return 一个对象  对象就作为存储的value函数
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA-TOUTIAO',
      // storage: window.sessionStorage,
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    a: 555,
    // tokenObj: JSON.parse(localStorage.getItem('TOKEN')) || {}
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    // 将token存到vuex
    SET_TOKEN(state, token) {
      state.tokenObj = token
      // // token持久化本地存储
      // localStorage.setItem('TOKEN', JSON.stringify(token))
    }
  }
})
