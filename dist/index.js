"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
const path_1 = __importDefault(require("path"));
const pino_1 = __importDefault(require("pino"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Alias_1 = require("./entities/Alias");
const Insult_1 = require("./entities/Insult");
const server_1 = require("./server");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = pino_1.default();
    try {
        yield typeorm_1.createConnection({
            type: "postgres",
            url: process.env.DATABASE_URL,
            logging: true,
            migrations: [path_1.default.join(__dirname, "./migrations/*")],
            entities: [Insult_1.Insult, User_1.User, Alias_1.Alias],
        });
        const port = Number(process.env.PORT) || 8080;
        const app = yield server_1.createServer();
        app.listen(port);
        logger.info(`application running on port: ${port}`);
    }
    catch (error) {
        logger.error(error, "Error occurred while initializing application");
    }
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map