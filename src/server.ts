import Koa from "koa";
import { Server } from "http";
import { ErrorCallback, retry } from "async";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import cookie from "koa-cookie";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { UserResolver } from "./resolvers/User";
import * as userRoute from "./routes/User";
import { logRequest, errorHandler, responseTime } from "./middleware";
import { UserTypeResolver } from "./resolvers/UserType";
import { MyLogger } from "./utils/logger";
import { InsultResolver } from "./resolvers/Insult";

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
    if (typeof this.server === "undefined") {
      throw new Error("Server is not open");
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
  const logger = MyLogger.getLogger();

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === "production" ? undefined : false,
    })
  );
  app.use(cors({ credentials: true }));
  app.use(cookie());
  app.use(responseTime);
  app.use(logRequest(logger));
  app.use(errorHandler(logger));

  // Register routes
  userRoute.init(app);

  const schema = buildSchemaSync({
    resolvers: [UserResolver, UserTypeResolver, InsultResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ ctx }) => ctx,
  });

  apolloServer.applyMiddleware({ app, cors: false });
  return appSrv;
}
