"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose = require('mongoose').default;
var connectDatabase_1 = __importDefault(require("../utils/connectDatabase"));
var User_1 = __importDefault(require("./User"));
var _a = (0, connectDatabase_1.default)(), chatBoxDB = _a.chatBoxDB, uniDentalDB = _a.uniDentalDB;
var UserModel = uniDentalDB.model('User', User_1.default);
exports.UserModel = UserModel;
