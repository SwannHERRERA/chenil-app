import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User";
@Entity()
export class UserType {
  @PrimaryGeneratedColumn("uuid")
  typeId: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.types)
  users: User[];
}
