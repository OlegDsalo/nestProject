import { Injectable, NotFoundException } from "@nestjs/common";
import { CoffeeEntity } from "./entities/coffee.entity";
import { Connection, DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Coffee } from "./entities/coffee";
import { FlavorEntity } from "./entities/flavor.entity";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto/pagination-query.dto";
import { Event } from "../events/entities/event.entity/event.entity";
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeeEntity)
    private readonly coffeeRepository: Repository<CoffeeEntity>,
    @InjectRepository(FlavorEntity)
    private readonly flavorRepository: Repository<FlavorEntity>,
    private readonly connection: Connection,
    private readonly dataSource: DataSource,
  ) {}

  async getAll(paginationQueryDto: PaginationQueryDto) {
    return await this.coffeeRepository.find({
      relations: ["flavors"],
      take: paginationQueryDto.limit,
      skip: paginationQueryDto.offset,
    });
  }

  async getOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ["flavors"],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(coffeDto: Coffee) {
    const flavors = await Promise.all(
      coffeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({ ...coffeDto, flavors });
    return await this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeDto: Coffee) {
    const flavors =
      updateCoffeDto.flavors &&
      (await Promise.all(
        updateCoffeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: String(+id),
      ...updateCoffeDto,
      flavors,
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

  async recommendCoffee(coffee: CoffeeEntity) {
    const queryRunner = this.connection.createQueryRunner();
    const dataRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommendations++;
      const recommendEvent = new Event();
      recommendEvent.name = "recommended_coffee";
      recommendEvent.type = "coffee";
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<FlavorEntity> {
    const existingFlavor = await this.flavorRepository.findOneBy({ name });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
