import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemtemLocationPossibility } from "./TemtemLocationPossibility";
import { UserTemtem } from "./UserTemtem";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("uuid")
  locationId: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  trigger: string;

  @Column()
  isReserved: boolean;

  @OneToMany(
    () => TemtemLocationPossibility,
    (temtemLocationPossibility) => temtemLocationPossibility.location
  )
  temtems: TemtemLocationPossibility[];

  @OneToMany(() => UserTemtem, (userTemtem) => userTemtem.findIn)
  userTemtemFindHere: UserTemtem[];
}
