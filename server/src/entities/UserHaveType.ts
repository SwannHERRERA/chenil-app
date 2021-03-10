import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { UserType } from "./UserType";

@Entity()
export class UserHaveType {
  @PrimaryGeneratedColumn("uuid")
  userHaveTypeId: string;

  @OneToMany(() => User, (user) => user.types)
  user: User;

  @OneToMany(() => UserType, (userType) => userType.users)
  type: UserType;
}
