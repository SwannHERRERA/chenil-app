import Koa from "koa";
import Router from "koa-router";
import { home } from "../controller/User";

export function init(server: Koa) {
  const router = new Router();
  router.get("/user", home);
  server.use(router.routes());
}
