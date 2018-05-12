
module.exports = async (socket, data) => {
  console.log('match handle ----> ', data)
  socket.emit('match-success', data)
}
