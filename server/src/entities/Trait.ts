import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TemtemHaveTrait } from "./TemtemHaveTrait";

@Entity()
export class Trait {
  @PrimaryGeneratedColumn("uuid")
  traitId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => TemtemHaveTrait, (TemtemHaveTrait) => TemtemHaveTrait.trait)
  temtems: TemtemHaveTrait[];
}
