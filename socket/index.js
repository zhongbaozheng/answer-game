const { port } = require('config').socket
const match = require('./namespaces/match')

const prefix = {
  onlineUsers () {
    return 'onlineUsers'
  }
}

const isOnlineUser = async (userId) => {
  const result = await Cache.sismember(prefix.onlineUsers(), userId)
  return result
}

const addOnlineUser = async (userId) => {
  const result = await Cache.sadd(prefix.onlineUsers(), userId)
  return result
}

const deleteOnlineUser = async (userId) => {
  await Cache.srem(prefix.onlineUsers(userId), userId)
}

module.exports = function (app) {
  var server = require('http').Server(app.callback())
  var io = require('socket.io')(server)
  global.Io = io
  server.listen(port, () => {
    console.log('Socket listening at ', port)
  })
  io.on('connect', (socket) => {
    socket.on('online', async (data) => {
      console.log(data);
      socket.userId = data.userId
      if (isOnlineUser(data.userId)) {
        io.emit('logout', { userId: data.userId, mchId: data.mchId })
      }
      await addOnlineUser(data.userId)
    })
    socket.on('off', async (data) => {
      await deleteOnlineUser(data.userId)
      socket.disconnect(true)
    })
    socket.on('disconnect', async () => {
      await deleteOnlineUser(socket.userId)
      socket.disconnect(true)
    })
  })
  // match
  match(io)
}
