import { User } from "../entities/User";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "argon2";
import pino from "pino";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async hello() {
    return "World!";
  }

  @Mutation(() => Boolean)
  async Admin(
    @Arg("email") email: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("inGamePseudo") inGamePseudo: string,
    @Arg("idDiscord") idDiscord: string,
    @Arg("password") password: string,
    @Arg("tokenVersion", () => Int) tokenVersion: number,
    @Arg("pansuns", () => Int) pansuns: number
  ) {
    const hashedPassword = await hash(password);
    try {
      await User.insert({
        email,
        firstName,
        lastName,
        inGamePseudo,
        idDiscord,
        password: hashedPassword,
        tokenVersion,
        pansuns,
      });
    } catch (err) {
      const logger = pino();
      logger.error(err);
      return false;
    }
    return true;
  }
}
