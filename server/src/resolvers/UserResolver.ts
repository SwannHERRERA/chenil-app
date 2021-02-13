import { User } from "../entities/User";
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Int,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import argon2 from "argon2";
import { isAuth } from "../middleware/authentication";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../utils/authentication";
import { Context } from "koa";
import { getConnection } from "typeorm";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field()
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers() {
    return User.find();
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  getMyId(@Ctx() { ctx }: Context) {
    console.log(ctx);
    const userId = ctx.payload?.userId;
    return `your user id is: ${userId}`;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId") userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { ctx }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Inccorect login");
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw new Error("Inccorect login");
    }

    sendRefreshToken(ctx, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async addUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("LastName") lastName: string,
    @Arg("id_discord") id_discord: string,
    @Arg("age", () => Int) age: number
  ) {
    const hash = await argon2.hash(password);
    try {
      const user = await User.create({
        email,
        password: hash,
        firstName,
        lastName,
        age,
        id_discord,
      }).save();
      return user;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
