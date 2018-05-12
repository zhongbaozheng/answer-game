/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 19:54:38
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-12 18:41:49
 */

require('./library/cache')

const path = require('path')
const Koa = require('koa')
const app = new Koa()

require('./extend/koa')(app)

const middlewares = require('./middleware')
const router = require('./router')

app.use(require('koa-static')(path.join(__dirname, '/public')))

app.use(middlewares)
app.use(router.middleware())

const { port } = require('config')
app.listen(port, () => {
  console.log(`The server is running on ${port}`)
})

var server = require('http').Server(app.callback())
var io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.emit('news', { text: 'hello world' })
  socket.on('other event', function (data) {
    console.log('----> ', data)
  })
})

server.listen(8001)
