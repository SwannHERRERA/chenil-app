import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type {
  @PrimaryGeneratedColumn("uuid")
  typeId: string;

  @Column()
  name: string;
}
