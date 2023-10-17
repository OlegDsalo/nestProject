import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoffeeEntity } from "./coffee.entity";

@Entity("flavor")
export class FlavorEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @JoinTable()
  @ManyToMany((type) => CoffeeEntity, (coffee) => coffee.flavors)
  coffees: Array<CoffeeEntity>;
}
