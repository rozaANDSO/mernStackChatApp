const http = require('http')
const express = require('express')
const { Server } = require('socket.io') // Correct import
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

exports.getReceiverSocketId=(receiverId)=>{
  return useSocketMap().get(receiverId)
}
app.use(express.static('public'))
io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`)
  const userId = socket.handshake.query.userId
  if (userId != 'undefined') useSocketMap(userId) = socket.id

  io.emit(
    'getOnlineUsers',
    Object.values(useSocketMap()).map((id) => io.sockets.sockets[id]),
  )
  socket.on('joinRoom', (room) => {
    socket.join(room)
    console.log(`User ${socket.id} joined room ${room}`)
  })

  socket.on('sendMessage', (msg) => {
    io.to(msg.room).emit('receiveMessage', msg)
  })
  socket.on('disconnect', () => {
    console.log(`a user disconnected: ${socket.id}`)
    if (useSocketMap().has(socket.id)) {
      const userId = useSocketMap().get(socket.id)
      delete useSocketMap()[userId]
      io.emit(
        'getOnlineUsers',
        Object.values(useSocketMap()).map((id) => io.sockets.sockets[id]),
      )
    }
  })
})
module.exports = {
  app,
  io,
  server,
}
