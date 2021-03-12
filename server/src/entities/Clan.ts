import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserClan } from "./UserClan";

@Entity()
export class Clan {
  @PrimaryGeneratedColumn("uuid")
  clanId: string;

  @Column()
  name: string;

  @Column()
  bannerImage: string;

  @Column({ type: "int" })
  pansunsFund: number;

  @OneToMany(() => UserClan, (userClan) => userClan.clan)
  users: UserClan[];
}
