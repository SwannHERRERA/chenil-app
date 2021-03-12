import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Move } from "./Move";
import { MoveMethod } from "./TemtemHaveMove";
import { UserTemtem } from "./UserTemtem";

@Entity()
export class UserTemtemHaveMove {
  @PrimaryGeneratedColumn("uuid")
  userTemtemHaveMoveId: string;

  @ManyToOne(() => UserTemtem, (userTemtem) => userTemtem.moves)
  userTemtem: UserTemtem;

  @ManyToOne(() => Move, (move) => move.userTemtem)
  move: Move;

  @Column()
  method: MoveMethod;
}
