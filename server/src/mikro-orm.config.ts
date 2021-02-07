import { Configuration, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Insult } from "./entities/Insult";

export default {
  dbName: "discord-bot-chenil",
  user: "root",
  password: "root",
  debug: !__prod__,
  type: "postgresql",
  entities: [Insult],
} as Configuration<IDatabaseDriver<Connection>>;
