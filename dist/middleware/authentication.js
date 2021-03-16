"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.isAuth = ({ context }, next) => {
    const ctx = context.ctx;
    const authorization = ctx.req.headers["authorization"];
    if (!authorization) {
        throw new Error("Not authenticated");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
        ctx.payload = payload;
    }
    catch (err) {
        console.error(err);
        throw new Error("not authenticated");
    }
    return next();
};
//# sourceMappingURL=authentication.js.map