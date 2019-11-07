/*
 * @Description: user
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-07 17:39:27
 * @LastEditTime: 2019-11-07 19:13:03
 * @LastEditors: Duchin/梁达钦
 */
import request from '@/utils/request'
/**
 * @description: 用户邮箱登录-获取验证码
 * @param {type}
 * @return: Promise
 */
export function loginOne(data) {
  return request({
    url: '/v1/users/mailbox',
    method: 'post',
    data
  })
}

/**
 * @description: 验证码登录
 * @param {type}
 * @return: Promise
 */
export function loginCodeTwo(data) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data
  })
}

/**
 * @description: 用户结束会话
 * @param {type}
 * @return: Promise
 */
export function logout() {
  return request({
    url: '/v1/user/logout',
    method: 'get'
  })
}

