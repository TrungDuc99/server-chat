import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { AuthRouter, UserRouter } from './routes'
import connectDBs from './utils/connectDatabase'
import { UserDoc } from './models/User'

const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const PORT = parseInt(<string>process.env.PORT, 10) || 9888

connectDBs()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// Config chat settings
const generateID = () => Math.random().toString(36).substring(2, 10)
let chatRooms: any[] = []

// routes api
app.use('/api/user', UserRouter)
app.use('/api', AuthRouter)
app.get('/api/chats', (req, res) => {
  res.json(chatRooms)
})

const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})

const socketIo = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
  },
})

socketIo.on('connection', (socket: any) => {
  console.log('New client connected' + socket.id)

  // socket.emit('getId', socket.id)
  socket.on('createRoom', function (name: string, users: UserDoc[], callback: any) {
    let roomIdCheck = null

    for (let i = 0; i < chatRooms.length; i++) {
      const room = chatRooms[i]
      if (room.users[0].id === users[0].id && room.users[1].id === users[1].id) {
        roomIdCheck = room.id
        break
      }
      if (roomIdCheck !== null) {
        break
      }
    }
    if (!roomIdCheck) {
      socket.join(name)
      const roomId = generateID()
      chatRooms.unshift({ id: roomId, name, messages: [], users })
      callback(roomId)
      socketIo.emit('roomsList', { data: chatRooms })
    } else {
      console.log({ roomIdCheck })

      callback(roomIdCheck)
    }
  })

  socket.emit('roomsList', chatRooms)
  socket.on('findRoom', function (id: any) {
    let result = chatRooms.filter((room) => room.id == id)

    socketIo.emit('foundRoom', result[0].messages)
  })

  socket.on('newMessage', function (data: any) {
    const { room_id, message, user, timestamp } = data

    let result = chatRooms.filter((room) => room.id == room_id)

    const newMessage = {
      id: generateID(),
      content: message || '',
      user,
      createdAt: `${timestamp.hour}:${timestamp.mins}`,
    }
    socketIo.to(result[0]?.id).emit('roomMessage', newMessage)
    result[0]?.messages?.push(newMessage)

    socketIo.emit('roomsList', chatRooms)
    socketIo.emit('foundRoom', result[0]?.messages)
  })
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})
