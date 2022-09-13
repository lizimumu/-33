// 获取用户的接口
import request from '@/utils/request'
/**
 * 获取用户自己的频道
 * @returns promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/** 获取所有频道
 *
 */
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
