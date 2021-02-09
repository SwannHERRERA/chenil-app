import { Context } from "koa";

const home = (ctx: Context) => {
  ctx.body = "Hello World !";
};

export default home;
