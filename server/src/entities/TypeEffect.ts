import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./Type";

@Entity()
export class TypeEffect {
  @PrimaryGeneratedColumn("uuid")
  TypeEffectId: string;

  @OneToMany(() => Type, (type) => type.fromType)
  fromType: Type;

  @OneToMany(() => Type, (type) => type.toTypes)
  toType: Type;

  @Column()
  coefficient: number;
}
