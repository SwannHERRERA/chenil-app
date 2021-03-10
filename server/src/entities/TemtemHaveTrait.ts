import { Entity, ManyToOne } from "typeorm";
import { Temtem } from "./Temtem";
import { Trait } from "./Trait";

@Entity()
export class TemtemHaveTrait {
  @ManyToOne(() => Temtem, (temtem) => temtem.traits)
  temtem: Temtem;

  @ManyToOne(() => Trait, (trait) => trait)
  trait: Trait;
}
