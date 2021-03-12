import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ItemTransaction } from "./ItemTransaction";
import { TemtemTransaction } from "./TemtemTransaction";
import { User } from "./User";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  paymentId: string;

  @ManyToOne(() => User, (user) => user.userPayment)
  author: User;

  @ManyToOne(() => User, (user) => user.paymentSecondaryParticipant, {
    nullable: true,
  })
  withUser: User;

  @Column({ type: "int" })
  authorPansuns: number;

  @Column({ type: "int" })
  withUserPansuns: number;

  @OneToMany(
    () => TemtemTransaction,
    (temtemTransaction) => temtemTransaction.payment
  )
  temtemTransaction: TemtemTransaction[];

  @OneToMany(
    () => ItemTransaction,
    (itemTransaction) => itemTransaction.payment
  )
  itemTransaction: ItemTransaction[];
}
