import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { Alias } from "./Alias";
import { Insult } from "./Insult";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
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
