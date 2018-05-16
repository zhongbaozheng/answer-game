/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 22:41:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-16 16:07:45
 */

const router = require('koa-router')()
const uuid = require('node-uuid')

const Room = require('../socket/namespaces/room')
const { OnlineUser, PlayingUser } = require('../library/fightState')

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
  const [online1, online2, playing1, playing2] = await Promise.all([
    OnlineUser.includes(ctx.request.body.userIds[0]),
    OnlineUser.includes(ctx.request.body.userIds[1]),
    PlayingUser.includes(ctx.request.body.userIds[0]),
    PlayingUser.includes(ctx.request.body.userIds[1])
  ])
  if (!online1 || !online2) {
    ctx.error(null, '玩家不在线', 500)
    return
  }
  if (playing1 || playing2) {
    ctx.error(null, '玩家对战中', 500)
  }
  const roomId = uuid.v4()
  Room(Io, roomId)

  // 匹配成功
  Io.emit('fight', { userIds: ctx.request.body.userIds, chapterId: ctx.request.body.chapterId, chapterName: ctx.request.body.chapterName, roomId })
  ctx.ok('指定对战成功')
})

module.exports = router
