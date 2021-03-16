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
exports.logRequest = void 0;
function logRequest(logger) {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        yield next();
        const message = `[${ctx.status}] ${ctx.method} ${ctx.path}`;
        const logData = {
            method: ctx.method,
            path: ctx.path,
            statusCode: ctx.status,
            timeMs: Date.now() - start
        };
        if (ctx.status >= 400) {
            logger.error(message, logData, ctx.body);
        }
        else {
            logger.info(message, logData);
        }
    });
}
exports.logRequest = logRequest;
//# sourceMappingURL=log-request.js.map