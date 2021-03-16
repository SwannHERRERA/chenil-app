"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const User_1 = require("../controller/User");
function init(server) {
    const router = new koa_router_1.default();
    router.get("/", User_1.home);
    router.post("/refresh_token", User_1.refreshToken);
    server.use(router.routes());
}
exports.init = init;
//# sourceMappingURL=User.js.map