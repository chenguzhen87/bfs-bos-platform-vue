/*
 * @Description: admin-api
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-07 17:39:27
 * @LastEditTime: 2019-11-07 19:11:54
 * @LastEditors: Duchin/梁达钦
 */

import request from '@/utils/request'

/* ============激活码操作Active Code  start============*/

/**
 * @description: 发送激活码
 * @param {Number} code: 激活码
 * @return: request http
 */

export function sendActive(code) {
  return request({
    url: `/v1/activationcode/resend/codeKey/${code}`,
    method: 'get'
  })
}

/**
 * @description: 下载文件
 * @param {Number} code: 激活码
 * @return: request http
 */

export function downloadActiveFile(code) {
  return request({
    url: `/v1/activationcode/download/${code}`,
    method: 'get'
  })
}

/**
 * @description: 获取激活码列表
 * @param {}
 * @return: request http
 */

export function getActiveList(code) {
  const url = code ? `/v1/activationcodes/${code}` : `/v1/activationcodes`
  return request({
    url,
    method: 'get'
  })
}

/**
 * @description: 创建批量激活码
 * @param {}
 * @return: request http
 */

export function createBatchActive(data) {
  return request({
    url: `/v1/activationcodes`,
    method: 'post',
    data
  })
}
/* ============激活码操作Active Code  end============*/

/* ============用户管理操作  start============*/

/**
 * @description: 启用 / 禁用
 * @param {Boolean} type true: 启用 / false 禁用
 * @param {String} mailbox 邮箱
 * @return: request http
 */

export function setUserStatus(mailbox, type) {
  return request({
    url: `/v1/users/${mailbox}/status/${type}`,
    method: 'put'
  })
}

/**
 * @description: 设置 / 取消 管理员
 * @param {Boolean} type true: 设置 / false 取消
 * @param {String} mailbox 邮箱
 * @return: request http
 */

export function setUserAdmin(mailbox, type) {
  return request({
    url: `/v1/users/${mailbox}/administrator/status/${type}`,
    method: 'put'
  })
}

/**
 * @description: 获取用户列表
 * @param {}
 * @return: request http
 */
export function getUserList() {
  return request({
    url: `/v1/users`,
    method: 'get'
  })
}

/* ============用户管理操作  end============*/

/* ============实例管理  start============*/

/**
 * @description: 删除实例
 * @param {String} name: 实例name
 * @param {String} mailbox: 邮箱
 * @return: request http
 */
export function delInstance(name, mailbox) {
  return request({
    url: `/v1/virtualmachines/${name}/mailbox/${mailbox}`,
    method: 'delete'
  })
}

/**
 * @description: 启动 / 关闭 实例
 * @param {String} name: 实例name
 * @param {Boolean} type: true启动 、 false关闭
 * @param {Object} data
 * @return: request http
 */
export function setInstanceStatus(name, type, data) {
  return request({
    url: `/v1/virtualmachines/${name}/status/${type}`,
    method: 'put',
    data
  })
}

/**
 * @description: 获取实例列表
 * @param {}
 * @return: request http
 */
export function getInstanceList() {
  return request({
    url: `/v1/virtualmachines`,
    method: 'get'
  })
}

/* ============实例管理  end============*/

/* ============日志管理  start============*/

/**
 * @description: 获取日志列表
 * @param {}
 * @return: request http
 */
export function getLogList(data) {
  return request({
    url: `/v1/audits`,
    method: 'post',
    data
  })
}
