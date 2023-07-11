"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("../controller/AuthController"));
var AuthenticateToken_1 = require("../middleware/AuthenticateToken");
var AuthRouter = (0, express_1.Router)();
AuthRouter.post('/login', AuthController_1.default.login);
AuthRouter.post('/register', AuthController_1.default.register);
AuthRouter.get('/me', AuthenticateToken_1.authenticateToken, AuthController_1.default.me);
exports.default = AuthRouter;
