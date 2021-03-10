import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "./Move";

@Entity()
export class MoveSynergie {
  @PrimaryGeneratedColumn("uuid")
  moveSynergieId: string;

  @OneToMany(() => Move, (move) => move.parentMove)
  move: Move;

  @OneToMany(() => Move, (move) => move.synergie)
  moveSynergie: Move;
}
