import { verify } from "jsonwebtoken";
import { Context } from "koa";
import { createAccessToken, createRefreshToken } from "../utils/token";
import { User } from "../entities/User";
import { MyLogger } from "../utils/logger";

interface JsonWebTokenResult {
  userId: string;
  tokenVersion: number;
}

export function home(ctx: Context) {
  ctx.body = "hello API World";
}

export function sendRefreshToken(ctx: Context, token: string): void {
  ctx.cookies.set("jid", token, {
    httpOnly: true,
    path: "/user/refresh_token",
  });
}

export async function refresh_tokens(ctx: Context): Promise<void> {
  const token = ctx.cookies.get("jid");
  if (!token) {
    ctx.body = { status: 401, accessToken: "", ok: false };
    return;
  }

  let user: User | undefined | null = null;

  try {
    const payload: JsonWebTokenResult = verify(
      token!,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JsonWebTokenResult;
    user = await User.findOne({ where: { userId: payload.userId } });
    if (!user || user.tokenVersion !== payload.tokenVersion) {
      throw new Error("no user or token invalid");
    }
  } catch (err) {
    const logger = MyLogger.getLogger();
    logger.error(err);
    ctx.body = {
      ok: false,
      accessToken: "",
    };
    return;
  }

  sendRefreshToken(ctx, createRefreshToken(user!));

  ctx.body = {
    ok: true,
    accessToken: createAccessToken(user!),
  };
}
