import { Module } from "@nestjs/common";
import { CoffeesController } from "./coffeesController";
import { CoffeesService } from "./coffees.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeEntity } from "./entities/coffee.entity";
import { FlavorEntity } from "./entities/flavor.entity";
import { Event } from "../events/entities/event.entity/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeEntity, FlavorEntity, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
