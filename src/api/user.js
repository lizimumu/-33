// user.js 划分是跟后端接口文档
import request from '@/utils/request'
// 引入store
// import store from '@/store'
/**
 *登录
 * @param {String} mobile 用户手机
 * @param {Number} code 验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
/**
 *
 * @param {String} mobile 手机号
 * @returns
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 *获取用户信息
 * @returns Promise
 */

export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

/**
 * 上传图片
 * @param {*} file 裁剪后的图片的file对象
 * @returns
 */
export const uploadPhotoAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
