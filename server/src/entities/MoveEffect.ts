import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Effect } from "./Effect";
import { Move } from "./Move";

@Entity()
export class MoveEffect {
  @PrimaryGeneratedColumn("uuid")
  MoveEffectId: string;

  @Column()
  intencity: number;

  @Column()
  duration: number;

  @ManyToOne(() => Move, (move) => move.effects)
  move: Move;

  @ManyToOne(() => Effect, (effect) => effect.moves)
  effect: Effect;
}
