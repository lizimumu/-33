// 所有关于新闻的接口
import request from '@/utils/request'
/**
 *
 * @param {String |Number}id频道的id
 * @param {Number}  timestamp 请求新推荐的时间戳
 * @returns
 */
export const getArticles = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
