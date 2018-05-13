
module.exports = (io, roomId) => {
  const room = io.of(`/room/${roomId}`)
  room.users = new Set()
  room.begin = false

  room.on('connect', (socket) => {
    // 用户加载完成
    socket.on('ready', (data) => {
      // 将userId添加到房间中
      room.users.add(data.userId)
      // 当房间内人数达到两人时开启游戏
      if (room.users.size === 2 && room.begin === false) {
        room.begin = true
        room.emit('begin')
      }
    })
    // 用户回答问题
    socket.on('answer', (data) => {
      // 向对战方发送对手的回答信息
      socket.broadcast.emit('opponentAnswer', data)
    })
    // 用户完成对战所有题目
    socket.on('finish', (data) => {
      room.users.delete(data.userId)
      if (room.users.size === 0 && room.begin === true) {
        room.emit('over', { opponentQuit: false })
      }
    })
    // 用户中途退出房间
    socket.on('quit', (data) => {
      room.users.delete(data.userId)
      room.emit('over', { opponentQuit: true })
    })
    // 用户断开连接
    socket.on('disconnect', async () => {
      room.emit('over', { opponentQuit: true })
    })
  })
}
