"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.home = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authentication_1 = require("../utils/authentication");
const User_1 = require("../entities/User");
const home = (ctx) => {
    ctx.body = "Hello World !";
};
exports.home = home;
const refreshToken = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const token = ctx.cookie.jid;
    const { userId, tokenVersion } = getUserIdByToken(token, ctx);
    console.log(userId, tokenVersion);
    let user = yield User_1.User.findOne({ id: userId });
    if (user && user.tokenVersion === tokenVersion) {
        authentication_1.sendRefreshToken(ctx, authentication_1.createRefreshToken(user));
        ctx.body = { ok: true, accessToken: authentication_1.createAccessToken(user) };
    }
    else {
        ctx.body = { ok: false, accessToken: "" };
    }
});
exports.refreshToken = refreshToken;
const getUserIdByToken = (token, ctx) => {
    if (!token) {
        ctx.body = { ok: false, accessToken: "" };
        return ctx;
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (err) {
        console.error(err);
        ctx.body = { ok: false, accessToken: "" };
        return ctx;
    }
    return payload;
};
//# sourceMappingURL=User.js.map