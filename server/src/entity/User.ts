import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Alias } from "./Alias";
import { Insult } from "./Insult";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  id_discord: string;

  @OneToMany(() => Alias, (alias) => alias.user)
  alias: Alias[];

  @ManyToMany(() => Insult, (insult) => insult.users, {
    cascade: true,
  })
  @JoinTable()
  insults: Insult[];
}
