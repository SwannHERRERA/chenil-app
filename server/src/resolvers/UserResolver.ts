import { User } from "../entities/User";
import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Int,
  ObjectType,
  Field,
} from "type-graphql";
import argon2 from "argon2";
import { sign } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers() {
    return User.find();
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

    const secretKey = String(process.env.JWT_SECRET_KEY);

    return {
      accessToken: sign({ userId: user.id }, secretKey, {
        expiresIn: "15m",
      }),
    };
  }

  @Mutation(() => User)
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
