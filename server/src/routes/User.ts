import Koa from "koa";
import Router from "koa-router";
import { home, refreshToken } from "../controller/User";

export function init(server: Koa) {
  const router = new Router();
  router.get("/", home);
  router.post("/refresh_token", refreshToken);
  server.use(router.routes());
}
