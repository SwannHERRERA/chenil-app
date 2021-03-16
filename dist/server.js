"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.AppServer = void 0;
const koa_1 = __importDefault(require("koa"));
const async_1 = require("async");
const errors_1 = require("./utils/errors");
const userRoute = __importStar(require("./routes/User"));
const middlewares = __importStar(require("./middleware"));
const pino_1 = __importDefault(require("pino"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const apollo_server_koa_1 = require("apollo-server-koa");
const cors_1 = __importDefault(require("@koa/cors"));
const UserResolver_1 = require("./resolvers/UserResolver");
const type_graphql_1 = require("type-graphql");
const koa_cookie_1 = __importDefault(require("koa-cookie"));
class AppServer {
    constructor(app) {
        this.app = app;
    }
    listen(port) {
        this.server = this.app.listen(port);
        return this.server;
    }
    getServer() {
        return this.server;
    }
    closeServer() {
        if (typeof this.server === undefined) {
            throw new errors_1.AppError(10001, "Server is not initialized");
        }
        const checkPendingRequests = (callback) => {
            this.server.getConnections((err, pendingRequests) => {
                if (err) {
                    callback(err);
                }
                else if (pendingRequests > 0) {
                    callback(Error(`Number of pending requests: ${pendingRequests}`));
                }
                else {
                    callback(undefined);
                }
            });
        };
        return new Promise((resolve, reject) => {
            async_1.retry({ times: 10, interval: 1000 }, checkPendingRequests.bind(this), ((error) => {
                if (error) {
                    this.server.close(() => reject(error));
                }
                else {
                    this.server.close(() => resolve());
                }
            }).bind(this));
        });
    }
}
exports.AppServer = AppServer;
function createServer() {
    const app = new koa_1.default();
    const appSrv = new AppServer(app);
    const logger = pino_1.default();
    app.use(koa_helmet_1.default({
        contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
    }));
    app.use(cors_1.default());
    app.use(koa_cookie_1.default());
    app.use(middlewares.responseTime);
    app.use(middlewares.logRequest(logger));
    app.use(middlewares.errorHandler(logger));
    userRoute.init(app);
    const schema = type_graphql_1.buildSchemaSync({
        resolvers: [UserResolver_1.UserResolver],
    });
    const apolloServer = new apollo_server_koa_1.ApolloServer({
        schema,
        context: ({ ctx }) => ({ ctx }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    return appSrv;
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map