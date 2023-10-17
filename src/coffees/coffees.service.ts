import { Injectable, NotFoundException } from "@nestjs/common";
import { CoffeeEntity } from "./entities/coffee.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee.dto";

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private coffeeRepository: Repository<CoffeeEntity>,
  ) {}

  async getAll() {
    return await this.coffeeRepository.find();
  }

  async getOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(coffeDto: Coffee) {
    const coffee = this.coffeeRepository.create(coffeDto);
    return await this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeDto: Coffee) {
    const coffee = await this.coffeeRepository.preload({
      id: String(+id),
      ...updateCoffeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return await this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    return this.coffeeRepository.remove(coffee);
  }
}
