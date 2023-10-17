import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coffee')
export class CoffeeEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column('json', { nullable: true })
  flavors: string[];
}
