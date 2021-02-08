import { Entity, Column, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Insult {
  @Column()
  text: string;

  @Column()
  trigger: string;

  @ManyToMany(() => User, (user) => user.insults)
  users: User[];
}
