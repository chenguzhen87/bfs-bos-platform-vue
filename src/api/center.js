/*
 * @Description: center-api
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-07 17:39:27
 * @LastEditTime: 2019-11-07 19:12:15
 * @LastEditors: Duchin/梁达钦
 */

import request from '@/utils/request'

/**
 * @description: 启动在线账户
 * @param {type}
 * @return:
 */

export function startAccount(name, data) {
  return request({
    url: `/v1/virtualmachines/${name}/status/true`,
    method: 'put',
    data
  })
}

/**
 * @description: 关闭在线账户
 * @param {type}
 * @return:
 */

export function shutAccount(name) {
  return request({
    url: `/v1/virtualmachines/${name}/status/false`,
    method: 'put'
  })
}

/**
 * @description: 删除在线账户
 * @param {type}
 * @return:
 */

export function deleteAccount(name, email) {
  return request({
    url: `/v1/virtualmachines/${name}/mailbox/${email}`,
    method: 'delete'
  })
}

/**
 * @description: 获取在线账户-currentVM/vm-name
 * @param {type}
 * @return:
 */

export function getAccount(email) {
  return request({
    url: `/v1/virtualmachines/account/${email}`,
    method: 'get'
  })
}

/**
 * @description: 创建在线账户
 * @param {type}
 * @return:
 */

export function createAccount(data) {
  return request({
    url: `/v1/virtualmachine`,
    method: 'post',
    data
  })
}

/**
 * @description: 获取在线账户信息
 * @param {type}
 * @return:
 */

export function getAccountData(email) {
  return request({
    url: `/v1/virtualmachines/account/${email}`,
    method: 'get'
  })
}

/* ============log操作日志  start============*/
/**
 * @description: 获取操作日志列表
 * @param {type}
 * @return:
 */

export function getLogList(base64Mailbox, data) {
  return request({
    url: `/v1/audits/${base64Mailbox}`,
    method: 'post',
    data
  })
}

/* ============log操作日志 end============*/
