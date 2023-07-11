"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connectDatabase_1 = __importDefault(require("./utils/connectDatabase"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var bodyParser = require('body-parser');
require('dotenv').config();
var app = (0, express_1.default)();
var PORT = parseInt(process.env.PORT, 10) || 9888;
(0, connectDatabase_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(PORT));
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//Config chat settings
// routes api
app.use('/api/user', routes_1.UserRouter);
app.use('/api', routes_1.AuthRouter);
// import express, { Request, Response } from 'express'
// import connectDatabase from './utils/connectDatabase'
// import cors from 'cors'
// import morgan from 'morgan'
// import path from 'path'
// import { AuthRouter, UserRouter } from './routes'
// const bodyParser = require('body-parser')
// require('dotenv').config()
// const app = express()
// const PORT = parseInt(<string>process.env.PORT, 10) || 9888
// const http = require('http').Server(app)
// const socketIO = require('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:9888',
//   },
// })
// connectDatabase()
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
// app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, 'public')))
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
// })
// // Handle JSON body
// app.use(express.json())
// // Config chat settings
// const generateID = () => Math.random().toString(36).substring(2, 10)
// let chatRooms: any = []
// socketIO.on('connection', (socket: any) => {
//   console.log(`⚡: ${socket.id} user just connected!`)
//   socket.on('createRoom', (name: any) => {
//     socket.join(name)
//     chatRooms.unshift({ id: generateID(), name, messages: [] })
//     socket.emit('roomsList', chatRooms)
//   })
//   socket.on('findRoom', (id: any) => {
//     let result = chatRooms.filter((room: any) => room.id == id)
//     socket.emit('foundRoom', result[0].messages)
//   })
//   socket.on('newMessage', (data: any) => {
//     const { room_id, message, user, timestamp } = data
//     let result = chatRooms.filter((room: any) => room.id == room_id)
//     const newMessage = {
//       id: generateID(),
//       text: message,
//       user,
//       time: `${timestamp.hour}:${timestamp.mins}`,
//     }
//     console.log('New Message', newMessage)
//     socket.to(result[0].name).emit('roomMessage', newMessage)
//     result[0].messages.push(newMessage)
//     socket.emit('roomsList', chatRooms)
//     socket.emit('foundRoom', result[0].messages)
//   })
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected')
//   })
// })
// app.get('/api', (req, res) => {
//   res.json(chatRooms)
// })
// // routes api
// app.use('/api/user', UserRouter)
// app.use('/api', AuthRouter)
