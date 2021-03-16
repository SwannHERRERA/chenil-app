import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Insult } from "./Insult";
import { User } from "./User";

@Entity()
export class InsultIsSpecialFor {
  @PrimaryGeneratedColumn("uuid")
  insultIsSpecialForId: string;
  @ManyToOne(() => User, (user) => user.insults)
  user: User;

  @ManyToOne(() => Insult, (insult) => insult.users)
  insult: Insult;
}
