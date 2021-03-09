import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EvolutionLine } from "./EvolutionLine";
import { TemtemImage } from "./TemtemImage";

@Entity()
export class Temtem {
  @PrimaryGeneratedColumn("uuid")
  teitemId: string;

  @Column()
  name: string;

  @Column()
  inGameId: number;

  @Column({ nullable: true })
  publishDate: Date;

  @Column({ nullable: true })
  catchRate: number;

  @Column({ nullable: true })
  tvYield: string;

  @Column()
  maleRate: number;

  @Column()
  femaleRate: number;

  @OneToMany(() => TemtemImage, (temtemImage) => temtemImage.temtem)
  images: TemtemImage[];

  @ManyToOne(() => EvolutionLine, (evolutionLine) => evolutionLine.name)
  evolutionLine: EvolutionLine;

  /**
   * firstType,
   * secondType
   */

  @Column()
  hp: number;

  @Column()
  sta: number;

  @Column()
  speed: number;

  @Column()
  atk: number;

  @Column()
  def: number;

  @Column()
  speatk: number;

  @Column()
  spedef: number;
}
