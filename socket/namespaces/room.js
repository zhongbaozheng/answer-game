const request = require('request-promise')
const { PlayingUser } = require('../../library/fightState')

module.exports = (io, roomId) => {
  const room = io.of(`/room/${roomId}`)
  room.users = new Set()
  room.begin = false

  room.on('connect', (socket) => {
    // 用户加载完成
    socket.on('ready', async (data) => {
      // 更新用户对战状态
      console.log(data.userId)
      await PlayingUser.add([data.userId])
      socket.userId = data.userId
      room.users.add(data.userId)
      // 当房间内人数达到两人时开启游戏
      if (room.users.size === 2 && room.begin === false) {
        room.begin = true
        const getFunc = room.users.values()
        const playerOne = Number(getFunc.next().value)
        const playerTwo = Number(getFunc.next().value)
        room.playingUsers = [playerOne, playerTwo]
        const options = {
          playerOne,
          playerTwo,
          chapterId: data.chapterId
        }
        try {
          const result = await request({
            method: 'POST',
            uri: 'http://brain.vipgz1.idcfengye.com/brain/getQuestions',
            body: options,
            json: true
          })
          room.emit('begin', result.data)
        } catch (e) {
          console.log(e)
        }
      }
    })
    // 用户回答问题
    socket.on('answer', (data) => {
      // 向对战方发送对手的回答信息
      socket.broadcast.emit('opponentAnswer', data)
    })
    // 用户完成对战所有题目
    socket.on('finish', async (data) => {
      room.users.delete(data.userId)
      room.requestUserId = room.requestUserId || data.userId
      if (room.users.size === 0 && room.begin === true) {
        await PlayingUser.remove(room.playingUsers)
        room.emit('over', { opponentQuit: false, requestUserId: room.requestUserId })
      }
    })
    // 用户中途退出房间
    socket.on('quit', async (data) => {
      // 清除用户对战状态，结束对战
      await PlayingUser.remove(room.playingUsers)
      room.users.delete(data.userId)

      room.requestUserId = room.playingUsers[0] === socket.userId ? room.playingUsers[1] : room.playingUsers[0]
      room.emit('over', { opponentQuit: true, requestUserId: room.requestUserId })
    })
    // 用户断开连接
    socket.on('disconnect', async () => {
      // 清除用户对战状态，结束对战
      await PlayingUser.remove(room.playingUsers)
      room.users.delete(socket.userId)

      room.requestUserId = room.playingUsers[0] === socket.userId ? room.playingUsers[1] : room.playingUsers[0]
      room.emit('over', { opponentQuit: true, requestUserId: room.requestUserId })
    })
  })
}
