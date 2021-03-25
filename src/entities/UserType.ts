import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { UserHaveType } from "./UserHaveType";
@ObjectType()
@Entity()
export class UserType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  typeId: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserHaveType, (userHaveType) => userHaveType.type)
  users: Promise<UserHaveType[]>;
}
