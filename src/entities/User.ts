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
import { Field, Int, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  inGamePseudo: String;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ nullable: true })
  idDiscord: string;

  @Field(() => Int)
  @Column({ type: "int" })
  tokenVersion: number;

  @Field(() => Int)
  @Column({ type: "int" })
  pansuns: number;

  @ManyToOne(() => Alias, (alias) => alias.user)
  alias: Alias[];

  @Field(() => [UserHaveType])
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
