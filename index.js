/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 19:54:38
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-13 15:38:56
 */

require('./library/cache')

const path = require('path')
const Koa = require('koa')
const app = new Koa()

require('./extend/koa')(app)

const middlewares = require('./middleware')
app.use(middlewares)
app.use(require('koa-static')(path.join(__dirname, '/public')))

const { port } = require('config')
app.listen(port, () => {
  console.log(`The server is running on ${port}`)
})

require('./socket/index')(app)
