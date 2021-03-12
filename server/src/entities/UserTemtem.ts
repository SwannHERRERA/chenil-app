import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Temtem } from "./Temtem";
import { Type } from "./Type";
import { User } from "./User";
import { Location } from "./Location";
import { UserTemtemHaveMove } from "./UserTemtemHaveMove";
import { Reproduction } from "./Reproduction";

export enum CardType {
  temcard = "temcard",
  temcardP = "temcard+",
  temcardPP = "temcard++",
  saidcard = "saidcard",
}

export enum TemtemSexe {
  Male,
  Female,
}

@Entity()
export class UserTemtem {
  @PrimaryGeneratedColumn("uuid")
  userTemtemId: string;

  @ManyToOne(() => User, (user) => user.temtems)
  user: User;

  @ManyToOne(() => Temtem, (temtem) => temtem.temtemUser)
  temtem: Temtem;

  @Column({ nullable: true })
  rename: string;

  @Column()
  card: CardType;

  @Column({ nullable: true })
  originalTamer: string;

  @Column()
  lvl: number;

  @Column({ default: false })
  luma: boolean;

  @Column()
  sexe: TemtemSexe;

  @Column({ type: "int" })
  fetility: number;

  @Column({ default: false })
  isEgg: boolean;

  @ManyToOne(() => Location, (location) => location.userTemtemFindHere)
  findIn: Location;

  @ManyToOne(() => Type, (type) => type.userTemtemAddtionalType)
  additionalType: Type;

  @OneToMany(
    () => UserTemtemHaveMove,
    (userTemtemHaveMove) => userTemtemHaveMove.userTemtem
  )
  moves: UserTemtemHaveMove[];

  @OneToMany(() => Reproduction, (reproduction) => reproduction.father, {
    nullable: true,
  })
  reproductionFather: Reproduction[];

  @OneToMany(() => Reproduction, (reproduction) => reproduction.mother, {
    nullable: true,
  })
  reproductionMother: Reproduction[];

  @Column()
  svHp: number;

  @Column()
  svSta: number;

  @Column()
  svSpeed: number;

  @Column()
  svAtk: number;

  @Column()
  svDef: number;

  @Column()
  svSpeatk: number;

  @Column()
  svSpedef: number;

  @Column()
  tvHp: number;

  @Column()
  tvSta: number;

  @Column()
  tvSpeed: number;

  @Column()
  tvAtk: number;

  @Column()
  tvDef: number;

  @Column()
  tvSpeatk: number;

  @Column()
  tvSpedef: number;
}
