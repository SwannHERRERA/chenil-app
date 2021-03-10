import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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
    
    @OneToMany(() => Move, move => move.effects)
    move: Move;
        
    @OneToMany(() => Effect, effect => effect.moves)
    effect: Effect;
}
