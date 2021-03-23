import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Logger } from "pino";
import { AppError } from "../utils/errors";

export function errorHandler(logger: Logger): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      logger.error("Error Handler:", err);

      if (err instanceof AppError) {
        ctx.body = err.toModel();
        ctx.status = err.code ? err.code : 500;
      } else {
        ctx.body = new AppError(500, "Internal Error Server");
        ctx.status = 500;
      }
    }
  };
}
