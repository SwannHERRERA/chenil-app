import { UserType } from "../entities/UserType";
import { Mutation, Resolver, Query, Arg, Authorized } from "type-graphql";
import { UserHaveType } from "../entities/UserHaveType";
import { User } from "../entities/User";
import { MyLogger } from "../utils/logger";

@Resolver(UserType)
export class UserTypeResolver {
  @Query(() => [UserType])
  @Authorized("ADMIN")
  async listAllTypes(): Promise<UserType[]> {
    return await UserType.find();
  }
  @Query(() => [UserHaveType])
  async getUserTypeByUser(
    @Arg("userId") userId: string
  ): Promise<UserHaveType[]> {
    return await UserHaveType.find({
      relations: ["user", "type"],
      where: { user: userId },
    });
  }

  @Mutation(() => Boolean)
  async addUserType(@Arg("name") name: string): Promise<boolean> {
    try {
      await UserType.insert({ name });
      return true;
    } catch (err) {
      const logger = MyLogger.getLogger();
      logger.error(err);
    }
    return false;
  }

  @Mutation(() => Boolean)
  async setUserTypeForUser(
    @Arg("userId") userId: string,
    @Arg("userTypeId") userTypeId: string
  ) {
    try {
      const user = await User.findOne({ where: { userId } });
      const type = await UserType.findOne({ where: { typeId: userTypeId } });
      await UserHaveType.insert({
        user,
        type,
      });
      return true;
    } catch (err) {
      const logger = MyLogger.getLogger();
      logger.error(err);
    }
    return false;
  }
}
