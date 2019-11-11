/*
 * @Description:
 * @Author: Duchin/梁达钦
 * @Date: 2019-11-08 17:15:53
 * @LastEditTime: 2019-11-08 17:17:57
 * @LastEditors: Duchin/梁达钦
 */

const Base64 = require('js-base64').Base64

/**
 * Base64 加密转码
 * @param {String} string
 */
export function base64Encoder(string) {
  return Base64.encode(string)
}

/**
 * Base64 解密转码
 * @param {String} string
 */
export function base64Decoder(string) {
  return Base64.decode(string)
}

/**
 * script 时间处理
 * @param {String} value undefined null ''类型
 */
export function formatDate(now) {
  if (typeof now === 'undefined') {
    return ''
  }
  var year = now.getFullYear()
  var month = ('0' + (now.getMonth() + 1)).substr(-2)
  var date = now.getDate()
  var hour = ('0' + now.getHours()).substr(-2)
  var minute = ('0' + now.getMinutes()).substr(-2)
  var second = ('0' + now.getSeconds()).substr(-2)
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}
