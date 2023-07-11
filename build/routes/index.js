"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.UserRouter = void 0;
var User_1 = __importDefault(require("./User"));
exports.UserRouter = User_1.default;
var Auth_1 = __importDefault(require("./Auth"));
exports.AuthRouter = Auth_1.default;
