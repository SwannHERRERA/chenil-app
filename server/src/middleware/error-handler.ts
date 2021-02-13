import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Logger } from "pino";
import { AppError } from "../utils/errors";

const httpCodes = [500, 404, 400, 400, 401, 403];

export function errorHandler(logger: Logger): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      logger.error("Error Handler:", err);

      if (err instanceof AppError) {
        ctx.body = err.toModel();
        ctx.status = httpCodes[err.code] ? httpCodes[err.code] : 500;
      } else {
        ctx.body = new AppError(10000, "Internal Error Server");
        ctx.status = 500;
      }
    }
  };
}
