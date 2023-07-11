"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var defaultType_1 = __importDefault(require("../utils/defaultType"));
require('dotenv').config();
var UserSchema = new mongoose_1.Schema({
    email: defaultType_1.default.email,
    name: defaultType_1.default.string,
    avatarUrl: defaultType_1.default.string,
    password: defaultType_1.default.password,
    phone: defaultType_1.default.string,
    address: defaultType_1.default.string,
    created: defaultType_1.default.date_now,
    updated: defaultType_1.default.date,
});
exports.default = UserSchema;
