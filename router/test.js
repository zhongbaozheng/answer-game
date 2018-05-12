/*
 * @Author: QuincyChen [chenquincy@qq.com] 
 * @Date: 2017-10-17 22:41:04 
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-12 18:06:21
 */

const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log(ctx.query)
  ctx.ok('test')
})

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.ok(comment)
})

module.exports = router
