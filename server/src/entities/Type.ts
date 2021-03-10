import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "./Move";
import { Temtem } from "./Temtem";
import { TypeEffect } from "./TypeEffect";

@Entity()
export class Type {
  @PrimaryGeneratedColumn("uuid")
  typeId: string;

  @Column()
  name: string;

  @ManyToOne(() => Move, (move) => move.synergieType, { nullable: true })
  moveWithSynergieType: Move[];

  @ManyToOne(() => Move, (move) => move.type)
  moves: Move[];

  @ManyToOne(() => Temtem, (temtem) => temtem.firstType)
  temtemFirstType: Temtem[];

  @ManyToOne(() => Temtem, (temtem) => temtem.secondType, { nullable: true })
  temtemSecondType: Temtem[];

  @ManyToOne(() => TypeEffect, (typeEffect) => typeEffect.fromType)
  fromType: Type[];

  @ManyToOne(() => TypeEffect, (typeEffect) => typeEffect.toType)
  toTypes: Type[];
}
