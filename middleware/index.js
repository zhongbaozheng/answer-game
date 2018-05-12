/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 19:54:02
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-12 18:30:42
 */

const cors = require('kcors')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const compose = require('koa-compose')
const auth = require('./auth')
const error = require('./error')

module.exports = compose([
  cors(),
  bodyparser(),
  logger(),
  auth(),
  error()
])
