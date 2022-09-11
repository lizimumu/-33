// 1.yarn add axios
// 2.引入axios
// 3.配置axios
import axios from 'axios'
import store from '@/store'
// axios.default.baseURL = 'http://toutiao.itheima.net'
// axios.default.timeout = 5000
// export default axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
// ?const request = axios.create() 克隆axios 其他页面基准地址可以单独配置 需要了单独配置
// 请求拦截器
// config 每一次的配置对象

request.interceptors.request.use(
  function (config) {
    // !填入store 结构 用 isLogin 来判断登录的状态
    // !每一次发请求都会执行这个函数
    // !在发送请求前判断
    // !如果登录了所有的请求都加上Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    // !必须返回config
    // console.log(config)
    return config
  },
  function (error) {
    console.log(error)
  }
)
