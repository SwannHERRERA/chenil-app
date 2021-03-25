import {
  BaseEntity,
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
import { UserTemtem } from "./UserTemtem";
import { UserClan } from "./UserClan";
import { UserItem } from "./UserItem";
import { Payment } from "./Payment";
@Entity()
export class User extends BaseEntity {
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

  @OneToMany(() => UserTemtem, (userTemtem) => userTemtem.user)
  temtems: UserTemtem[];

  @OneToMany(() => UserClan, (userClan) => userClan.user)
  clans: UserClan[];

  @OneToMany(() => UserItem, (userItem) => userItem.user)
  userItem: UserItem[];

  @OneToMany(() => Payment, (payment) => payment.author)
  userPayment: Payment[];

  @OneToMany(() => Payment, (payment) => payment.withUser, { nullable: true })
  paymentSecondaryParticipant: Payment[];
}
