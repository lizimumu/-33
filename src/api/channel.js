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
