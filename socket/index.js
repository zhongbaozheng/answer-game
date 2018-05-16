const { port } = require('config').socket
const match = require('./namespaces/match')
const { OnlineUser } = require('../library/fightState')

module.exports = function (app) {
  var server = require('http').Server(app.callback())
  var io = require('socket.io')(server)
  global.Io = io
  server.listen(port, () => {
    console.log('Socket listening at ', port)
  })
  io.on('connect', (socket) => {
    socket.on('online', async (data) => {
      socket.userId = data.userId
      if (OnlineUser.includes(data.userId)) {
        io.emit('logout', { userId: data.userId, mchId: data.mchId })
      }
      await OnlineUser.add(data.userId)
    })
    socket.on('off', async (data) => {
      await OnlineUser.remove([data.userId])
      socket.disconnect(true)
    })
    socket.on('disconnect', async () => {
      await OnlineUser.remove([socket.userId])
      socket.disconnect(true)
    })
  })
  // match
  match(io)
}
