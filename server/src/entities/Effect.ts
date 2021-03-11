import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MoveEffect } from "./MoveEffect";

@Entity()
export class Effect {
  @PrimaryGeneratedColumn()
  effectId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => MoveEffect, (moveEffect) => moveEffect.effect)
  moves: MoveEffect[];
}
