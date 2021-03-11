import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EvolutionLine } from "./EvolutionLine";
import { TemtemHaveMove } from "./TemtemHaveMove";
import { TemtemHaveTrait } from "./TemtemHaveTrait";
import { TemtemImage } from "./TemtemImage";
import { TemtemLocationPossibility } from "./TemtemLocationPossibility";
import { Type } from "./Type";
import { UserTemtem } from "./UserTemtem";

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

  @OneToMany(() => TemtemHaveTrait, (TemtemHaveTrait) => TemtemHaveTrait.temtem)
  traits: TemtemHaveTrait[];

  @OneToMany(
    () => TemtemLocationPossibility,
    (temtemLocationPossibility) => temtemLocationPossibility.temtem
  )
  locationPossibility: TemtemLocationPossibility[];

  @ManyToOne(() => Type, (type) => type.temtemFirstType)
  firstType: Type;

  @ManyToOne(() => Type, (type) => type.temtemSecondType, { nullable: true })
  secondType: Type;

  @OneToMany(() => TemtemHaveMove, (temtemHaveMove) => temtemHaveMove.temtem)
  moves: TemtemHaveMove[];

  @OneToMany(() => UserTemtem, (userTemtem) => userTemtem.temtem)
  temtemUser: UserTemtem[];

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
