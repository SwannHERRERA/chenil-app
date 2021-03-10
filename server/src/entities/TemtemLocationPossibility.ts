import { format } from "path";
import {Column, Entity, ManyToOne} from "typeorm";
import { Temtem } from "./Temtem";
import { Location } from "./Location";

@Entity()
export class TemtemLocationPossibility {
    @ManyToOne(() => Location, (location) => location.temtems)
    location: Location;

    @ManyToOne(() => Temtem, (temtem) => temtem.locationPossibility)
    temtem: Temtem;

    @Column()
    rate: number
}
