/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 19:55:43
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-02-05 22:50:46
 */

const router = require('koa-router')({ prefix: '/api/v0' })
const routers = require('require-dir')('./', { recurse: true })

// 递归加载router文件，自动匹配路由路径
function exportRouter (params, path) {
  Object.keys(params).forEach(name => {
    if (typeof params[name].middleware === 'function') {
      router.use(`${path}/${name}`, require(`.${path}/${name}`).middleware())
    } else {
      exportRouter(params[name], `${path}/${name}`)
    }
  })
}

exportRouter(routers, '')

module.exports = router
