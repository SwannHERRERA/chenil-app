import Koa from "koa";
import Router from "koa-router";
import { home } from "../controller/User";

export function init(server: Koa) {
  const router = new Router();
  router.get("/api/v1/home", home);

  server.use(router.routes());
}
