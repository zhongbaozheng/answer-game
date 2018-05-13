/* eslint-disable */
var roomId, playRoom, playing = false, rightCount = 0, opponentRightCount = 0
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
    playRoom.emit('ready', { userId })
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
  playRoom.on('over', function () {
    if (rightCount >= opponentRightCount) {
      console.log('you win')
    } else {
      console.log('you lose')
    }
    playRoom.disconnect(true)
  })
})
function match () {
  console.log('matching ...')
  matchRoom.open()
  // 开始匹配
  matchRoom.emit('start', { userId, chapterId: 'test' })
}
function cancelMatch () {
  console.log('cancel match')
  matchRoom.disconnect()
  // 取消匹配
  matchRoom.emit('cancel', { userId, chapterId: 'test' })
}
/* eslint-disabled */
