import { verify } from "jsonwebtoken";
import { Context } from "koa";
import { MyLogger } from "../utils/logger";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  try {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      throw new Error("not authenticated");
    }

    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    const logger = MyLogger.getLogger();
    logger.error(err);
    throw new Error("not authenticated");
  }

  return next();
};
