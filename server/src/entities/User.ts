import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { UserType } from "./UserType";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  UserId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  inGamePseudo: String;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  idDiscord: string;

  @Column({ type: "int" })
  tokenVersion: number;

  @Column({ type: "int" })
  pansuns: number;

  @ManyToMany(() => UserType, (userType) => userType.users)
  types: UserType[];
}
