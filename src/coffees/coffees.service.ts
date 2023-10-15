import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoffeeEntity } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Array<CoffeeEntity> = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  getAll() {
    return this.coffees;
  }

  getOne(id: string) {
    const coffee = this.coffees.find((it) => it.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(coffeDto) {
    this.coffees.push(coffeDto);
  }

  update(id: string, updateCoffeDto: any) {
    const existingOne = this.getOne(id);
    if (!existingOne) {
    }
    // return
  }

  remove(id: string) {
    const coffeIndex = this.coffees.findIndex((it) => it.id === +id);
    if (coffeIndex >= 0) {
      this.coffees.splice(coffeIndex, 1);
    }
  }
}
