import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { Payment } from "./Payment";

@Entity()
export class ItemTransaction {
  @PrimaryGeneratedColumn("uuid")
  itemTransactionId: string;

  @ManyToOne(() => Item)
  item: Item;

  @ManyToOne(() => Payment, (payment) => payment.itemTransaction)
  payment: Payment;
}
