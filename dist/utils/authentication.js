"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.createAccessToken = (user) => {
    const secretKey = String(process.env.ACCESS_TOKEN_SECRET);
    return jsonwebtoken_1.sign({ userId: user.id }, secretKey, {
        expiresIn: "15m",
    });
};
exports.createRefreshToken = (user) => {
    const secretKey = String(process.env.REFRESH_TOKEN_SECRET);
    return jsonwebtoken_1.sign({ userId: user.id, tokenVersion: user.tokenVersion }, secretKey, {
        expiresIn: "7d",
    });
};
exports.sendRefreshToken = (ctx, token) => {
    ctx.cookies.set("jid", token, {
        httpOnly: true,
        path: "/refresh_token",
    });
};
//# sourceMappingURL=authentication.js.map