/*
 * @Description: index
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-07 19:09:03
 * @LastEditTime: 2019-11-07 19:12:48
 * @LastEditors: Duchin/梁达钦
 */

import request from '@/utils/request'

/* ============Home  start============*/
/**
 * @description: 首页话题列表信息
 * @param {type}
 * @return:
 */
export function indexlist(params) {
  return request({
    url: '/subject/index/list',
    method: 'get',
    params: params
  })
}
/* ============Home end============*/
