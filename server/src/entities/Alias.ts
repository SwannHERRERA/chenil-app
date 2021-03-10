import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
@Entity()
export class Alias {
  @PrimaryGeneratedColumn("uuid")
  AliasId: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.alias)
  user: User;
}
