/*
 * @Author: QuincyChen [chenquincy@qq.com]
 * @Date: 2017-10-17 22:41:04
 * @Last Modified by: QuincyChen
 * @Last Modified time: 2018-05-17 02:55:12
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
  // 打印在线玩家
  // await OnlineUser.showAll()

  const [online1, online2, playing1, playing2] = await Promise.all([
    OnlineUser.includes(ctx.request.body.userIds[0] + ''),
    OnlineUser.includes(ctx.request.body.userIds[1] + ''),
    PlayingUser.includes(ctx.request.body.userIds[0]),
    PlayingUser.includes(ctx.request.body.userIds[1])
  ])
  if (!online1 || !online2) {
    console.log('玩家不在线')
    ctx.error(null, '玩家不在线', 500)
    return
  }
  if (playing1 || playing2) {
    console.log('玩家对战中')
    ctx.error(null, '玩家对战中', 500)
    return
  }
  const roomId = uuid.v4()
  Room(Io, roomId)

  // 匹配成功
  Io.emit('fight', { userIds: ctx.request.body.userIds, chapterId: ctx.request.body.chapterId, chapterName: ctx.request.body.chapterName, roomId })
  ctx.ok('指定对战成功')
})

module.exports = router
