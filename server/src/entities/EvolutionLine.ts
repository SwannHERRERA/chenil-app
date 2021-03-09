import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Temtem } from "./Temtem";

@Entity()
export class EvolutionLine {
  @PrimaryGeneratedColumn("uuid")
  evolutionLineId: string;

  @Column()
  name: string;

  @OneToMany(() => Temtem, (temtem) => temtem.evolutionLine)
  members: Temtem[];
}
