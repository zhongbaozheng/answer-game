/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 22:41:04
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-16 01:24:02
 */

const router = require('koa-router')()
const uuid = require('node-uuid')
const Room = require('../socket/namespaces/room')

const prefix = {
  onlineUsers () {
    return 'onlineUsers'
  }
}

// 用户是否在线
const isOnlineUser = async (userId) => {
  const result = await Cache.sismember(prefix.onlineUsers(), userId)
  return result
}

// 指定两人对战
router.post('/', async (ctx, next) => {
  if (!ctx.request.body.userIds || ctx.request.body.userIds.length !== 2) {
    ctx.error(null, '请选择两名玩家', 500)
    return
  }
  if (!ctx.request.body.chapterId || !ctx.request.body.chapterName) {
    ctx.error(null, '请选择对战章节', 500)
    return
  }
  const [online1, online2] = await Promise.all([
    isOnlineUser(ctx.request.body.userIds[0]),
    isOnlineUser(ctx.request.body.userIds[1])
  ])
  if (!online1 || !online2) {
    ctx.error(null, '玩家不在线', 500)
    return
  }
  const roomId = uuid.v4()
  Room(Io, roomId)

  // 匹配成功
  Io.emit('fight', { userIds: ctx.request.body.userIds, chapterId: ctx.request.body.chapterId, chapterName: ctx.request.body.chapterName, roomId })
  ctx.ok('指定对战成功')
})

module.exports = router
