// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'
/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Base64 状态过滤判断
 * @param {String} string
 */
export function BooleanStrValue(string) {
  if (string) {
    return '是'
  } else {
    return '否'
  }
}

/**
 * 登录状态确认
 * @param {String} string 类型
 */
export function LogOptionType(value) {
  if (value === 'create') {
    return '创建'
  } else if (value === 'closed') {
    return '关闭'
  } else if (value === 'start') {
    return '启动'
  } else if (value === 'delete') {
    return '删除'
  } else if (value === 'import') {
    return '导入'
  } else if (value === 'export') {
    return '导出'
  } else if (value === 'login') {
    return '登陆'
  } else if (value === 'logout') {
    return '登出'
  } else {
    return '未定义'
  }
}

/**
 * 数据是否存在判断
 * @param {String} value undefined null ''类型
 */
export function EmptyReplace(value) {
  if (typeof value === 'undefined' || value == null || value == '') {
    return '-'
  } else {
    return value
  }
}

