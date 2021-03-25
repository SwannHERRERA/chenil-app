import { User } from "../entities/User";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "argon2";
import pino from "pino";
import { UserType } from "../entities/UserType";
import { UserHaveType } from "../entities/UserHaveType";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async listAllUser() {
    return await User.find();
  }

  @Query(() => User)
  async getUserWithTypes(
    @Arg("UserId") userId: string
  ): Promise<User | undefined> {
    const user = await User.findOne({
      relations: ["types", "types.type"],
      where: { UserId: userId },
    });
    console.dir(user?.types);

    return user;
  }

  @Mutation(() => Boolean)
  async addAdmin(
    @Arg("email") email: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("inGamePseudo") inGamePseudo: string,
    @Arg("idDiscord") idDiscord: string,
    @Arg("password") password: string,
    @Arg("tokenVersion", () => Int) tokenVersion: number,
    @Arg("pansuns", () => Int) pansuns: number
  ): Promise<boolean> {
    try {
      const hashedPassword = await hash(password);
      const customerType = await UserType.findOne({
        where: { name: "CUSTOMER" },
      });

      const userId = await User.create({
        email,
        firstName,
        lastName,
        inGamePseudo,
        idDiscord,
        password: hashedPassword,
        tokenVersion,
        pansuns,
      }).save();

      await UserHaveType.insert({
        user: userId,
        type: customerType!,
      });
    } catch (err) {
      const logger = pino();
      logger.error(err);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("userId") userId: string): Promise<boolean> {
    try {
      const user = await User.findOneOrFail(userId);
      await UserHaveType.delete({ user });
      await user.remove();
    } catch (err) {
      const logger = pino();
      logger.error(err);
      return false;
    }
    return true;
  }
}
