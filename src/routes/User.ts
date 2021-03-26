import Koa from "koa";
import Router from "koa-router";
import { home, refresh_tokens } from "../controller/User";

export function init(server: Koa) {
  const router = new Router({ prefix: "/user" });
  router.get("/", home);
  router.post("/refresh_token", refresh_tokens);
  server.use(router.routes());
}
