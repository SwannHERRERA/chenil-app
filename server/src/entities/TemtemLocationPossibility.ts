import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Temtem } from "./Temtem";
import { Location } from "./Location";

@Entity()
export class TemtemLocationPossibility {
  @PrimaryGeneratedColumn("uuid")
  temtemLocationPossibilityId: string;

  @ManyToOne(() => Location, (location) => location.temtems)
  location: Location;

  @ManyToOne(() => Temtem, (temtem) => temtem.locationPossibility)
  temtem: Temtem;

  @Column()
  rate: number;
}
