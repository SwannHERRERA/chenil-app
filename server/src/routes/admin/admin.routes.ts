import koaRouter from "koa-router";
import { login } from "./admin.controller";
import { validateParams } from "../../middleware/validate-params";
import { authorize } from "../../middleware/authorize";

const match = (regex: RegExp) => (term: string) => regex.test(term);

export const demoRouter = new koaRouter().post("login", login);
