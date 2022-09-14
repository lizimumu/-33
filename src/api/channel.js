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
/**
 * 删除频道
 * @param {Number | String} id 频道的id
 * @returns promise
 */
// 删除频道函数
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

// 添加频道
/**
 *
 * @param {String|Number} id 新增频道的id
 * @param {Number} seq 新增频道添加的索引值，添加到那个位置
 * @returns promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
