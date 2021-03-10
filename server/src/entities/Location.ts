import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemtemLocationPossibility } from "./TemtemLocationPossibility";

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
}
