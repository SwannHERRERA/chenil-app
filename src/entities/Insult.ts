import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { InsultIsSpecialFor } from "./InsultIsSpecialFor";

@ObjectType()
@Entity()
export class Insult extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  insultId: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  trigger: string;

  @OneToMany(
    () => InsultIsSpecialFor,
    (insultIsSpecialFor) => insultIsSpecialFor.insult
  )
  users: InsultIsSpecialFor[];
}
