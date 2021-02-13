import { Request, Response } from "koa";

export interface MyContext {
  ctx: {
    req: Request;
    res: Response;
    payload?: { userId: string };
  };
}
