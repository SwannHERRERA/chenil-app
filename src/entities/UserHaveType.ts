import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { UserType } from "./UserType";

@ObjectType()
@Entity()
export class UserHaveType extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  userHaveTypeId: string;

  @Field()
  userUserId: string;

  @Field()
  typeTypeId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.types)
  user: User;

  @Field(() => UserType)
  @ManyToOne(() => UserType, (userType) => userType.users)
  type: UserType;
}
