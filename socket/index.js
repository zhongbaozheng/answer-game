const { port } = require('config').socket
const match = require('./namespaces/match')

module.exports = function (app) {
  var server = require('http').Server(app.callback())
  var io = require('socket.io')(server)
  server.listen(port, () => {
    console.log('Socket listening at ', port)
  })
  // match
  match(io)
}
