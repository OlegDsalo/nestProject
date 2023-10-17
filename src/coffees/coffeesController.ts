import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee";

@Controller("coffees")
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @Get()
  getAll() {
    return this.coffeesService.getAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.getOne(id);
  }

  @Post("create")
  createOne(@Body() coffeeObj: Coffee) {
    return this.coffeesService.create(coffeeObj);
  }

  @Patch(":id")
  updateOne(@Param("id") id: string, @Body() coffee: Coffee) {
    return this.coffeesService.update(id, coffee);
  }
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coffeesService.remove(id);
  }
}
