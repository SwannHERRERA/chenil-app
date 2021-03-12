import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./Payment";
import { UserTemtem } from "./UserTemtem";

@Entity()
export class TemtemTransaction {
  @PrimaryGeneratedColumn("uuid")
  temtemTransactionId: string;

  @ManyToOne(() => Payment, (payment) => payment.temtemTransaction)
  payment: Payment;

  @ManyToOne(() => UserTemtem)
  userTemtem: UserTemtem;
}
