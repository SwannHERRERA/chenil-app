import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Temtem } from "./Temtem";

export enum TemtemUseCase {
  Thumbmail,
  Thumbmail_luma,
  Full,
  Full_luma,
  FullBack,
  FullBack_luma,
}

@Entity()
export class TemtemImage {
  @PrimaryGeneratedColumn("uuid")
  temtemImageId: string;

  @ManyToOne(() => Temtem, (temtem) => temtem.images)
  temtem: Temtem;

  @Column()
  path: string;

  @Column()
  name: string;

  @Column()
  useCase: TemtemUseCase;

  /**
   * koish Type
   */
}
