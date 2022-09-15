import request from '@/utils/request'
/**
 *
 * @param {*} q 搜索关键词
 * @returns promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 *
 * @param {Number} page 分页页书 ，非必填
 * @param {Number} per_page 每一页书籍的数量
 * @param {String} q 搜索关键词
 * @returns
 */
export const getResultAPI = (/*eslint-disable-line */ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
