import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Insult } from "./entities/Insult";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  const insult = orm.em.create(Insult, { title: "Chien" });
  await orm.em.persistAndFlush(insult);
};

main().catch((err) => console.error(err));
