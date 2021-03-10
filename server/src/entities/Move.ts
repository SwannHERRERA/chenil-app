import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MoveEffect } from "./MoveEffect";
import { MoveSynergie } from "./MoveSynergie";
import { Type } from "./Type";

export enum MoveClass {
  Special,
  Normal,
}

export enum MoveTarget {
  Single,
  All,
  Team,
  Other,
  Self,
}

@Entity()
export class Move {
  @PrimaryGeneratedColumn("uuid")
  moveId: string;

  @Column()
  name: string;

  @Column()
  haveSynergie: boolean;

  @OneToMany(() => Type, (type) => type.moveWithSynergieType, {
    nullable: true,
  })
  synergieType: Type;

  @Column({ type: "int" })
  damage: number;

  @Column({ type: "int" })
  stamina: number;

  @Column({ type: "int" })
  hold: number;

  @Column({ type: "real" })
  priority: number;

  @OneToMany(() => Type, (type) => type.moves)
  type: Type;

  @Column()
  class: MoveClass;

  @Column()
  Target: MoveTarget;

  @OneToOne(() => MoveSynergie, (moveSynergie) => moveSynergie.moveSynergie)
  synergie: Move;

  @OneToOne(() => MoveSynergie, (moveSynergie) => moveSynergie.move)
  parentMove: Move;

  @ManyToOne(() => MoveEffect, (moveEffect) => moveEffect.move)
  effects: MoveEffect[];
}
