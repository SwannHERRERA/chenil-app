import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EggMoveGiver } from "./EggMoveGiver";
import { Move } from "./Move";
import { Temtem } from "./Temtem";

export enum MoveMethod {
  EggMove,
  Level,
  Couse,
}

@Entity()
export class TemtemHaveMove {
  @PrimaryGeneratedColumn("uuid")
  temtemHaveMove: string;

  @ManyToOne(() => Temtem, (temtem) => temtem.moves)
  temtem: Temtem;

  @ManyToOne(() => Move, (move) => move.temtems)
  move: Move;

  @Column()
  method: MoveMethod;

  @OneToMany(() => EggMoveGiver, (eggMoveGiver) => eggMoveGiver.temtemReciver)
  eggMoveTemtemsGivers: EggMoveGiver[];
  // Temtem
  // EggMoveGivers
}
