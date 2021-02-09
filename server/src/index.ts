import "dotenv-safe/config";
import path from "path";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Alias } from "./entities/Alias";
import { Insult } from "./entities/Insult";
import argon2 from 'argon2';

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    // synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Insult, User, Alias],
  });
  const userRepo = conn.getRepository(User);
  const swann = new User();
  swann.age = 20;
  swann.firstName = "swann";
  swann.lastName = "Herrera";
  swann.email = "swann@graines-octets.com";
  swann.id_discord = "154544sdzfef";
  try {
    swann.password = await argon2.hash("azer");
  } catch (err) {
    console.error(err);
  }
  await userRepo.save(swann);
}

main().catch((err) => {
  console.error(err);
});
