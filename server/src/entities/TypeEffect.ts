import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./Type";

@Entity()
export class TypeEffect {
  @PrimaryGeneratedColumn("uuid")
  TypeEffectId: string;

  @OneToOne(() => Type)
  fromType: Type;

  @OneToOne(() => Type) 
  toType: Type;

  @Column()
  coefficient: number;
}
