"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = process.env.TOKEN_SECRET_KEY;
// Middleware để xác thực JWT token
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        var decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Token has expired' });
    }
};
exports.authenticateToken = authenticateToken;
