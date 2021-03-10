import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Insult } from "./Insult";
import { User } from "./User";

@Entity()
export class InsultIsSpecialFor {
  @PrimaryGeneratedColumn("uuid")
  insultIsSpecialForId: string;
  @OneToMany(() => User, (user) => user.insults)
  user: User;

  @OneToMany(() => Insult, (insult) => insult.users)
  insult: Insult;
}
