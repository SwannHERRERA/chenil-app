import { verify } from "jsonwebtoken";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { Context } from "koa";

export const isAuth: Middleware<Context> = ({ context }, next) => {
  const ctx = context.ctx;

  const authorization = ctx.req.headers["authorization"];
  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    ctx.payload = payload as any;
  } catch (err) {
    console.error(err);
    throw new Error("not authenticated");
  }
  return next();
};
