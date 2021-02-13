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
import { createAccessToken, isAuth } from "../middleware/authentication";
import { MyContext } from "../MyContext";

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
  getMyId(@Ctx() { ctx }: MyContext) {
    console.log(ctx);
    const userId = ctx.payload?.userId;
    return `your user id is: ${userId}`;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Inccorect login");
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      throw new Error("Inccorect login");
    }

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
