import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Clan } from "./Clan";
import { User } from "./User";

@Entity()
export class UserClan {
  @PrimaryGeneratedColumn("uuid")
  userClanId: string;

  @ManyToOne(() => User, (user) => user.clans)
  user: User;

  @ManyToOne(() => Clan, (clan) => clan.users)
  clan: Clan;
}
