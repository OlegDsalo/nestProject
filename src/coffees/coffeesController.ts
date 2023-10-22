import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto/pagination-query.dto";

@Controller("coffees")
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @Get()
  getAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.getAll(paginationQuery);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.getOne(id);
  }

  @Post("create")
  createOne(@Body() coffeeObj: Coffee) {
    console.log(coffeeObj);
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
