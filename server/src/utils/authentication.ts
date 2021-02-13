import { sign } from "jsonwebtoken";
import { Context } from "koa";
import { User } from "../entities/User";

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

export const sendRefreshToken = (ctx: Context, token: string) => {
  ctx.cookies.set("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
