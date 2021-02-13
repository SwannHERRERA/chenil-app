import { verify } from "jsonwebtoken";
import { Context } from "koa";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../utils/authentication";
import { User } from "../entities/User";

const home = (ctx: Context) => {
  ctx.body = "Hello World !";
};

const refreshToken = async (ctx: Context) => {
  const token = ctx.cookie.jid;

  const { userId, tokenVersion } = getUserIdByToken(token, ctx);
  console.log(userId, tokenVersion);

  let user = await User.findOne({ id: userId });

  if (user && user.tokenVersion === tokenVersion) {
    sendRefreshToken(ctx, createRefreshToken(user!));
    ctx.body = { ok: true, accessToken: createAccessToken(user!) };
  } else {
    ctx.body = { ok: false, accessToken: "" };
  }
};

const getUserIdByToken = (token: string, ctx: Context): Context => {
  if (!token) {
    ctx.body = { ok: false, accessToken: "" };
    return ctx;
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.error(err);
    ctx.body = { ok: false, accessToken: "" };
    return ctx;
  }
  return payload;
};

export { home, refreshToken };
