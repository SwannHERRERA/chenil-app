import Koa from "koa";
import { Server } from "http";
import { ErrorCallback, retry } from "async";
import { AppError } from "./utils/errors";
import * as userRoute from "./routes/User";
import * as middlewares from "./middleware";
import pino from "pino";
import helmet from "koa-helmet";
export class AppServer {
  private app: Koa;
  private server: Server;
  constructor(app: Koa) {
    this.app = app;
  }

  public listen(port: number): Server {
    this.server = this.app.listen(port);
    return this.server;
  }

  public getServer(): Server {
    return this.server;
  }

  public closeServer(): Promise<void> {
    if (typeof this.server === undefined) {
      throw new AppError(10001, "Server is not initialized");
    }
    const checkPendingRequests = (
      callback: ErrorCallback<Error | undefined>
    ) => {
      this.server.getConnections(
        (err: Error | null, pendingRequests: number) => {
          if (err) {
            callback(err);
          } else if (pendingRequests > 0) {
            callback(Error(`Number of pending requests: ${pendingRequests}`));
          } else {
            callback(undefined);
          }
        }
      );
    };

    return new Promise<void>((resolve, reject) => {
      retry(
        { times: 10, interval: 1000 },
        checkPendingRequests.bind(this),
        ((error: Error | undefined) => {
          if (error) {
            this.server.close(() => reject(error));
          } else {
            this.server.close(() => resolve());
          }
        }).bind(this)
      );
    });
  }
}

export function createServer(): AppServer {
  const app = new Koa();
  const appSrv = new AppServer(app);
  const logger = pino();

  app.use(helmet());
  app.use(middlewares.responseTime);
  app.use(middlewares.logRequest(logger));
  app.use(middlewares.errorHandler(logger));

  // Register routes
  userRoute.init(app);

  return appSrv;
}
