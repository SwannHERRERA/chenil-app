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
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const httpCodes = [500, 404, 400, 400, 401, 403];
function errorHandler(logger) {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (err) {
            logger.error("Error Handler:", err);
            if (err instanceof errors_1.AppError) {
                ctx.body = err.toModel();
                ctx.status = httpCodes[err.code] ? httpCodes[err.code] : 500;
            }
            else {
                ctx.body = new errors_1.AppError(10000, "Internal Error Server");
                ctx.status = 500;
            }
        }
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map