import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { UserTemtem } from "./UserTemtem";

@Entity()
export class Reproduction {
  @PrimaryGeneratedColumn("uuid")
  reproductionId: string;

  @ManyToOne(() => UserTemtem, (userTemtem) => userTemtem.reproductionFather)
  father: UserTemtem;

  @ManyToOne(() => UserTemtem, (userTemtem) => userTemtem.reproductionMother)
  mother: UserTemtem;

  @Column({ type: "timestamp" })
  date: Date;

  @Column({ type: "int" })
  fertFemale: number;

  @Column({ type: "int" })
  fertMale: number;

  @ManyToOne(() => Item)
  itemMale: Item;

  @ManyToOne(() => Item)
  itemFemale: Item;

  @Column({ type: "int" })
  tier: number;

  @Column({ type: "int" })
  totalPrice: number;
}
