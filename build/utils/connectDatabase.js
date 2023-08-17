"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
// const connectDatabase = () => {
//   mongoose.Promise = require('bluebird')
//   mongoose
//     .connect(
//       `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
//         process.env.DB_URLDEV || process.env.DB_URL
//       }/unidental_db`
//     )
//     .then(() => {
//       console.log('Database connection created')
//     })
//     .catch((err) => {
//       console.log('Error:/n', err)
//     })
// }
// export default connectDatabase
var connectDBs = function () {
    var url_UniDentalDB_Connection = "mongodb+srv://dotrungduckspm:GfSJIhvp0cKUZoUq@cluster0.b56tbwm.mongodb.net/unidental_db";
    var url_ChatBoxDB_Connection = "mongodb+srv://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_URLDEV || process.env.DB_URL, "/chatbox_db");
    try {
        var uniDentalDB = mongoose_1.default.createConnection(url_UniDentalDB_Connection);
        var chatBoxDB = mongoose_1.default.createConnection(url_ChatBoxDB_Connection);
        console.log('connect to database successfully');
        return { uniDentalDB: uniDentalDB, chatBoxDB: chatBoxDB };
    }
    catch (error) {
        console.error("Error!");
        process.exit(1);
    }
};
exports.default = connectDBs;
