import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "./Move";

@Entity()
export class MoveSynergie {
  @PrimaryGeneratedColumn("uuid")
  moveSynergieId: string;

  @ManyToOne(() => Move, (move) => move.parentMove)
  move: Move;

  @ManyToOne(() => Move, (move) => move.synergie)
  moveSynergie: Move;
}
