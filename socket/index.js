const { port } = require('config').socket
const handlers = require('require-dir')('./event-handlers', { recurse: true })

module.exports = function (app) {
  var server = require('http').Server(app.callback())
  var io = require('socket.io')(server)

  io.on('connection', function (socket) {
    // 加载事件处理器
    Object.keys(handlers).forEach(eventName => {
      if (typeof handlers[eventName] === 'function') {
        socket.on(eventName, async function (data) {
          await handlers[eventName](socket, data)
        })
      }
    })
  })

  server.listen(port)
}
