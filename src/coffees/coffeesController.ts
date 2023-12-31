import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeeDto } from './entities/coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @Get()
  getAll() {
    return this.coffeesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.getOne(id);
  }

  @Post('create')
  createOne(@Body() coffeeObj: CoffeeDto) {
    return this.coffeesService.create(coffeeObj);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() coffee: CoffeeDto) {
    return this.coffeesService.update(id, coffee);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
