import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./Type";

@Entity()
export class TypeEffect {
  @PrimaryGeneratedColumn("uuid")
  TypeEffectId: string;

  @ManyToOne(() => Type, (type) => type.fromType)
  fromType: Type;

  @ManyToOne(() => Type, (type) => type.toTypes)
  toType: Type;

  @Column()
  coefficient: number;
}
