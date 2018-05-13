const uuid = require('node-uuid')
const Room = require('./room')

const prefix = {
  matchingUsers (chapterId) {
    return `matchingUsers-${chapterId}`
  }
}

// 用户是否匹配中
const isMatchingUser = async (userId, chapterId) => {
  const result = await Cache.sismember(prefix.matchingUsers(chapterId), userId)
  return result
}
// 添加用户到匹配队列
const addMatchingUser = async (userId, chapterId) => {
  await Cache.sadd(prefix.matchingUsers(chapterId), userId)
}
// 获取匹配中用户
const getMatchingUser = async (chapterId) => {
  const result = await Cache.spop(prefix.matchingUsers(chapterId))
  return result
}
// 删除匹配中用户
const deleteMatchingUser = async (userId, chapterId) => {
  await Cache.srem(prefix.matchingUsers(chapterId), userId)
}

module.exports = (io) => {
  const matchRoom = io.of('/match')
  matchRoom.on('connect', (socket) => {
    // 开始匹配
    socket.on('start', async (data) => {
      const matching = await isMatchingUser(data.userId, data.chapterId)
      if (matching) {
        return false
      }
      // 随机获取一个匹配中用户
      const userId = await getMatchingUser(data.chapterId)
      if (userId && userId !== data.userId) {
        // 创建房间
        const roomId = uuid.v4()
        Room(io, roomId)

        // 匹配成功
        matchRoom.emit('success', { userIds: [userId, data.userId], chapterId: data.chapterId, roomId })
      } else {
        // 将userId添加到对应的匹配队列中
        await addMatchingUser(data.userId, data.chapterId)
      }
    })
    // 取消匹配
    socket.on('cancel', async (data) => {
      console.log('cancel match', data.userId)
      await deleteMatchingUser(data.userId, data.chapterId)
    })
  })
}
