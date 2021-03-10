import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { InsultIsSpecialFor } from "./InsultIsSpecialFor";

@Entity()
export class Insult {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column()
  trigger: string;

  @ManyToOne(
    () => InsultIsSpecialFor,
    (insultIsSpecialFor) => insultIsSpecialFor.insult
  )
  users: InsultIsSpecialFor[];
}
