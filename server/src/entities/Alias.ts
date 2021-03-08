import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { User } from "./User";
@Entity()
export class Alias {
  @PrimaryGeneratedColumn("uuid")
  AliasId: string;

  @Column()
  name: string;

  @JoinColumn()
  user: User;
}
