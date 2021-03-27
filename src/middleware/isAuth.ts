import { verify } from "jsonwebtoken";
import { Context } from "koa";
import { MyLogger } from "src/utils/logger";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn = async (context: Context, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    const logger = MyLogger.getLogger();
    logger.error(err);
    throw new Error("not authenticated");
  }

  await next();
};
