import { Context } from "koa";

/**
 * Root GET Handler: Just return the API name.
 */
export async function login(ctx: Context) {
  ctx.body = "API Koa Starter from Rangle.io";
}
