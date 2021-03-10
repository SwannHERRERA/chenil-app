import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserHaveType } from "./UserHaveType";
@Entity()
export class UserType {
  @PrimaryGeneratedColumn("uuid")
  typeId: string;

  @Column()
  name: string;

  @ManyToOne(() => UserHaveType, (userHaveType) => userHaveType.type)
  users: UserHaveType[];
}
