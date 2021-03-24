import Koa from "koa";
import Router from "koa-router";
import { home } from "../controller/User";

export function init(server: Koa) {
  const router = new Router({ prefix: "/user" });
  router.get("/", home);
  server.use(router.routes());
}
