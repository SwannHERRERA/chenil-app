import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
