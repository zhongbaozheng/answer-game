/* eslint-disable */
var chapterId = 1
var roomId, playRoom, playing = false, rightCount = 0, opponentRightCount = 0
var home = io('http://localhost:8001')
home.on('connect', function (socket) {
  home.emit('online', { userId })
})
var matchRoom = io('http://localhost:8001/match')
matchRoom.on('success', function (data) {
  console.log('match success', data)
  roomId = data.roomId

  playRoom = io(`http://localhost:8001/room/${roomId}`)
  // 连接对战房间
  playRoom.on('connect', function (socket) {
    console.log('connect room success...')
  })
  setTimeout(() => {
    // 用户准备就绪
    console.log('ready ', { userId, chapterId })
    playRoom.emit('ready', { userId, chapterId })
  }, 1000)
  // 开始对战
  playRoom.on('begin', function () {
    console.log('begin play')
    playing = true
  })
  // 对方答题
  playRoom.on('opponentAnswer', function (data) {
    opponentRightCount++
  })
  // 对战结束
  playRoom.on('over', function (data) {
    if (rightCount >= opponentRightCount) {
      console.log('you win')
    } else {
      console.log('you lose')
    }
    // TODO: data.requestUserId === userId的话上传答题数据
    playRoom.disconnect(true)
  })
})
function match () {
  console.log('matching ...')
  matchRoom.open()
  // 开始匹配
  matchRoom.emit('start', { userId, chapterId })
}
function cancelMatch () {
  console.log('cancel match')
  matchRoom.disconnect()
  // 取消匹配
  matchRoom.emit('cancel', { userId, chapterId })
}
/* eslint-disabled */
