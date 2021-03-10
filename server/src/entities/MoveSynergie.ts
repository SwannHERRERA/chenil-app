import { Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Move } from "./Move";

@Entity()
export class MoveSynergie {
    @PrimaryGeneratedColumn("uuid")
    moveSynergieId: string;

    @OneToOne(() => Move, move => move.parentMove)
    move: Move;

    @OneToOne(() => Move, move => move.synergie)
    moveSynergie: Move;
}
