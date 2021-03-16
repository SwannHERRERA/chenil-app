import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Temtem } from "./Temtem";
import { Trait } from "./Trait";

@Entity()
export class TemtemHaveTrait {
  @PrimaryGeneratedColumn("uuid")
  temtemHaveTraitId: string;

  @ManyToOne(() => Temtem, (temtem) => temtem.traits)
  temtem: Temtem;

  @ManyToOne(() => Trait, (trait) => trait)
  trait: Trait;
}
