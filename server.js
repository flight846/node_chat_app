const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// const io = ('socket.io')(server)

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () { // when a browser is closed, a user is disconnected
    console.log('user disconnected')
  })
})

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
})

server.listen(3000, () => {
  console.log('server listening on port 3000')
})
