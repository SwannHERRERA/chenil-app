import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

@Entity()
export class UserItem {
  @PrimaryGeneratedColumn("uuid")
  userItemId: string;

  @ManyToOne(() => User, (user) => user.userItem)
  user: User;

  @ManyToOne(() => Item)
  item: Item;
}
