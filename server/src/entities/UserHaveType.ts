import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { UserType } from "./UserType";

@Entity()
export class UserHaveType {
  @PrimaryGeneratedColumn("uuid")
  userHaveTypeId: string;

  @ManyToOne(() => User, (user) => user.types)
  user: User;

  @ManyToOne(() => UserType, (userType) => userType.users)
  type: UserType;
}
