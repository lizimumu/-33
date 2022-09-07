import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // !声明一个变量，放到vuex
  // !vuex声明的变量放到state
  // !vuex 修改数据
  // !自产自销
  // !规范：函数命名采用大驼峰
  // !mutations 函数
  // !mutations里函数的参数
  // !state 数据
  //! 触发mutations里面的方法
  // ! this.$store.commit("mutations方法的名字")
  // ?触发方法可以接受一个参数 传参，payload 载荷触发mu11的参数
  //! getters 相当于computed 计算属性 自产自销
  //! getters 第一个参数是state
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
    }
  }
})
