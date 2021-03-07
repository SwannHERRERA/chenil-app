import { Entity, Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Insult {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  trigger: string;

  @ManyToMany(() => User, (user) => user.insults)
  users: User[];
}
