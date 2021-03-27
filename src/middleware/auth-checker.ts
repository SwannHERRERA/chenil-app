import { verify } from "jsonwebtoken";
import { Context } from "koa";
import { MyLogger } from "../utils/logger";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker = (context: Context, roles: string[]) => {
  const authorization = context.req.headers["authorization"];

  console.log(roles);

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

  return true;
};
