import { User } from "../entities/User";
import { sign, verify } from "jsonwebtoken";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "../MyContext";

export const createAccessToken = (user: User) => {
  const secretKey = String(process.env.ACCESS_TOKEN_SECRET);
  return sign({ userId: user.id }, secretKey, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  const secretKey = String(process.env.REFRESH_TOKEN_SECRET);
  return sign({ userId: user.id, tokenVersion: user.tokenVersion }, secretKey, {
    expiresIn: "7d",
  });
};

export const isAuth: Middleware<MyContext> = ({ context }, next) => {
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
