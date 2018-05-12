/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 19:53:17
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-12 18:29:43
 */

const Errors = require('../library/error')

// 扩展 Koa Context 方法
module.exports = function (app) {
  /**
   * 快速设置 ctx.body
   * @param {*} data 数据
   * @param {*} message 消息
   */
  app.context.ok = function (data, message) {
    this.body = { success: true, data, message }
  }

  /**
   * 快速设置 ctx.body
   * @param {*} data 数据
   * @param {*} message 消息
   */
  app.context.error = function (data, message, status) {
    this.status = status || 400
    this.body = { success: false, data, message }
  }

  // 加载错误类型
  for (const key in Errors) {
    app.context[key] = Errors[key]
  }

  return app
}
