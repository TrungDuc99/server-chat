"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
var connectDatabase = function () {
    mongoose_1.default.Promise = require('bluebird');
    mongoose_1.default
        .connect("mongodb+srv://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@").concat(process.env.DB_URLDEV || process.env.DB_URL, "/").concat(process.env.DB_NAME))
        .then(function () {
        console.log('Database connection created');
    })
        .catch(function (err) {
        console.log('Error:/n', err);
    });
};
exports.default = connectDatabase;
