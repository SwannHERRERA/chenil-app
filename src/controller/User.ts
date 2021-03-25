import { Context } from "koa";

export function home(ctx: Context) {
  ctx.body = "hello API World";
}

export function sendRefreshToken(ctx: Context, token: string): void {
  ctx.cookies.set("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
}
