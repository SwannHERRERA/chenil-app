import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { hash, verify } from "argon2";
import { MyLogger } from "../utils/logger";
import { UserType } from "../entities/UserType";
import { UserHaveType } from "../entities/UserHaveType";
import { Context } from "koa";
import { createRefreshToken, createAccessToken } from "../utils/token";
import { sendRefreshToken } from "../controller/User";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  accessToken: string;

  @Field()
  user: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async listAllUser(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User)
  async getUserWithTypes(
    @Arg("userId") userId: string
  ): Promise<User | undefined> {
    const user = await User.findOne({
      relations: ["types", "types.type"],
      where: { userId },
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
      const logger = MyLogger.getLogger();
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
      const logger = MyLogger.getLogger();
      logger.error(err);
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("login incorrect");
    }
    const isPasswordCorrect = await verify(user.password, password);
    if (!isPasswordCorrect) {
      throw new Error("login incorrect");
    }
    sendRefreshToken(ctx, createRefreshToken(user));
    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}
