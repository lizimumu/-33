// 1.yarn add axios
// 2.引入axios
// 3.配置axios
import axios from 'axios'
// axios.default.baseURL = 'http://toutiao.itheima.net'
// axios.default.timeout = 5000
// export default axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})
export default request
// ?const request = axios.create() 克隆axios 其他页面基准地址可以单独配置 需要了单独配置
