const uuid = require('node-uuid')

const Room = require('./room')
const { MatchingUser } = require('../../library/fightState')

module.exports = (io) => {
  const matchRoom = io.of('/match')
  matchRoom.on('connect', (socket) => {
    // 开始匹配
    socket.on('start', async (data) => {
      const matching = await MatchingUser.includes(data.chapterId, data.userId)
      if (matching) {
        return false
      }
      // 随机获取一个匹配中用户
      const userId = await MatchingUser.getOne(data.chapterId)
      if (userId && Number(userId) !== data.userId) {
        // 创建房间
        const roomId = uuid.v4()
        Room(io, roomId)

        // 匹配成功
        matchRoom.emit('success', { userIds: [userId, data.userId], chapterId: data.chapterId, roomId })
      } else {
        // 将userId添加到对应的匹配队列中
        await MatchingUser.add(data.chapterId, [data.userId])
      }
    })
    // 取消匹配
    socket.on('cancel', async (data) => {
      await MatchingUser.remove(data.chapterId, [data.userId])
    })
  })
}
