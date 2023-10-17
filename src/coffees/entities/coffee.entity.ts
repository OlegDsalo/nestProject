import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Flavor } from "./flavor";
import { FlavorEntity } from "./flavor.entity";

@Entity("coffee")
export class CoffeeEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  brand: string;
  @JoinTable()
  @ManyToMany((type) => FlavorEntity, (flavor) => flavor.coffees)
  flavors: string[];
}
