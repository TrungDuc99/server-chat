"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var connectDatabase_1 = __importDefault(require("./utils/connectDatabase"));
var bodyParser = require('body-parser');
require('dotenv').config();
var app = (0, express_1.default)();
var PORT = parseInt(process.env.PORT, 10) || 9888;
(0, connectDatabase_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Config chat settings
var generateID = function () { return Math.random().toString(36).substring(2, 10); };
var chatRooms = [];
// routes api
app.use('/api/user', routes_1.UserRouter);
app.use('/api', routes_1.AuthRouter);
app.get('/api/chats', function (req, res) {
    res.json(chatRooms);
});
var server = app.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(PORT));
});
var socketIo = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:".concat(PORT),
    },
});
socketIo.on('connection', function (socket) {
    console.log('New client connected' + socket.id);
    // socket.emit('getId', socket.id)
    socket.on('createRoom', function (name, users, callback) {
        var roomIdCheck = null;
        for (var i = 0; i < chatRooms.length; i++) {
            var room = chatRooms[i];
            if (room.users[0].id === users[0].id && room.users[1].id === users[1].id) {
                roomIdCheck = room.id;
                break;
            }
            if (roomIdCheck !== null) {
                break;
            }
        }
        if (!roomIdCheck) {
            socket.join(name);
            var roomId = generateID();
            chatRooms.unshift({ id: roomId, name: name, messages: [], users: users });
            callback(roomId);
            socketIo.emit('roomsList', { data: chatRooms });
        }
        else {
            console.log({ roomIdCheck: roomIdCheck });
            callback(roomIdCheck);
        }
    });
    socket.emit('roomsList', chatRooms);
    socket.on('findRoom', function (id) {
        var result = chatRooms.filter(function (room) { return room.id == id; });
        socketIo.emit('foundRoom', { data: result[0].messages });
    });
    socket.on('newMessage', function (data) {
        var _a, _b, _c;
        var room_id = data.room_id, message = data.message, user = data.user, timestamp = data.timestamp;
        var result = chatRooms.filter(function (room) { return room.id == room_id; });
        console.log('====================================');
        console.log(result);
        console.log('====================================');
        var newMessage = {
            id: generateID(),
            content: message || '',
            user: user,
            createdAt: "".concat(timestamp.hour, ":").concat(timestamp.mins),
        };
        socketIo.to((_a = result[0]) === null || _a === void 0 ? void 0 : _a.id).emit('roomMessage', newMessage);
        (_c = (_b = result[0]) === null || _b === void 0 ? void 0 : _b.messages) === null || _c === void 0 ? void 0 : _c.push(newMessage);
        socketIo.emit('roomsList', chatRooms);
        // socketIo.emit('foundRoom', result[0]?.messages)
    });
    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});
// socketIO.on('connection', (socket: any) => {
//   console.log(`⚡: ${socket.id} user just connected!`)
//   socket.on('createRoom', (name: string, users: UserDoc[], callback: any) => {
//     socket.join(name)
//     const roomId = generateID()
//     chatRooms.unshift({ id: roomId, name, messages: [], users })
//     // Gọi callback và truyền `roomId` để trả về mã phòng cho client
//     callback(roomId)
//     socket.emit('roomsList', chatRooms)
//   })
//   socket.on('findRoom', (id: any) => {
//     let result = chatRooms.filter((room) => room.id == id)
//     socket.emit('foundRoom', result[0].messages)
//   })
//   socket.on('newMessage', (data: any) => {
//     const { room_id, message, user, timestamp } = data
//     let result = chatRooms.filter((room) => room.id == room_id)
//     const newMessage = {
//       id: generateID(),
//       content: message,
//       user,
//       createdAt: `${timestamp.hour}:${timestamp.mins}`,
//     }
//     console.log('New Message', newMessage)
//     socket.to(result[0].name).emit('roomMessage', newMessage)
//     result[0].messages.push(newMessage)
//     socket.emit('roomsList', chatRooms)
//     socket.emit('foundRoom', result[0].messages)
//   })
//   socket.emit('roomsList', chatRooms)
//   socket.on('disconnect', () => {
//     console.log('🔥: A user disconnected')
//   })
// })
