import { Insult } from "../entities/Insult";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { MyLogger } from "../utils/logger";

const logger = MyLogger.getLogger();

@Resolver(Insult)
export class InsultResolver {
  @Query(() => [Insult])
  async listAllInsults(): Promise<Insult[]> {
    return await Insult.find();
  }
  @Mutation(() => Boolean)
  async addInsult(
    @Arg("trigger") trigger: string,
    @Arg("text") text: string
  ): Promise<boolean> {
    try {
      await Insult.insert({ text, trigger });
      return true;
    } catch (err) {
      logger.error(err);
    }
    return false;
  }
}
