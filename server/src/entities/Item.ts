import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  itemId: string;

  @Column()
  name: string;

  @Column({ type: "int", nullable: true })
  price: number;
}
