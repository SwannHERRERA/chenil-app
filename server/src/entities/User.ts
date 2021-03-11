import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail } from "class-validator";
import { Alias } from "./Alias";
import { UserHaveType } from "./UserHaveType";
import { InsultIsSpecialFor } from "./InsultIsSpecialFor";
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

  @OneToMany(() => UserHaveType, (userHaveType) => userHaveType.user)
  types: UserHaveType[];

  @OneToMany(
    () => InsultIsSpecialFor,
    (insultIsSpecialFor) => insultIsSpecialFor.user
  )
  insults: InsultIsSpecialFor[];
}
