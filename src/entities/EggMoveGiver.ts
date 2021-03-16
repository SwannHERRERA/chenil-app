import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "./Move";
import { Temtem } from "./Temtem";
import { TemtemHaveMove } from "./TemtemHaveMove";

@Entity()
export class EggMoveGiver {
  @PrimaryGeneratedColumn("uuid")
  eggMoveGiverId: string;

  @ManyToOne(() => Temtem)
  temtemGiver: Temtem;

  @ManyToOne(() => Move)
  move: Move;

  @ManyToOne(
    () => TemtemHaveMove,
    (temtemHaveMove) => temtemHaveMove.eggMoveTemtemsGivers
  )
  temtemReciver: TemtemHaveMove;
}
