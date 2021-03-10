import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail } from "class-validator";
import { UserType } from "./UserType";
import { Insult } from "./Insult";
import { Alias } from "./Alias";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  UserId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  inGamePseudo: String;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  idDiscord: string;

  @Column({ type: "int" })
  tokenVersion: number;

  @Column({ type: "int" })
  pansuns: number;

  @ManyToOne(() => Alias, (alias) => alias.user)
  alias: Alias[];

  @ManyToMany(() => UserType, (userType) => userType.users)
  types: UserType[];

  @ManyToMany(() => Insult, (insult) => insult.users, { nullable: true })
  insults: UserType[];
}
