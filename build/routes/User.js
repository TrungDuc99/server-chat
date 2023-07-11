"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importDefault(require("../controller/User"));
var AuthenticateToken_1 = require("../middleware/AuthenticateToken");
var UserRouter = (0, express_1.Router)();
UserRouter.get('/', AuthenticateToken_1.authenticateToken, User_1.default.get);
UserRouter.get('/:id', AuthenticateToken_1.authenticateToken, User_1.default.getOne);
UserRouter.post('/', AuthenticateToken_1.authenticateToken, User_1.default.create);
UserRouter.put('/:id', AuthenticateToken_1.authenticateToken, User_1.default.update);
UserRouter.delete('/:id', AuthenticateToken_1.authenticateToken, User_1.default.delete);
exports.default = UserRouter;
