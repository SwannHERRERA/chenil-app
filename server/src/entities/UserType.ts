import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserHaveType } from "./UserHaveType";
@Entity()
export class UserType {
  @PrimaryGeneratedColumn("uuid")
  typeId: string;

  @Column()
  name: string;

  @OneToMany(() => UserHaveType, (userHaveType) => userHaveType.type)
  users: UserHaveType[];
}
