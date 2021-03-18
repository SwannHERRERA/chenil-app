import { Context } from "koa";

export function home(ctx: Context) {
  ctx.body = "hello API World";
}
