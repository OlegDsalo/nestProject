import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    if (id < 1) {
      // throw new Error('Error hellow msf');
      throw new BadRequestException('Id must be more than 1 ');
    }
    return id;
    // return this.appService.getHello();
  }

  // @UsePipes()
  @Post('create')
  create(@Body() dto: CreateDto) {
    console.log('any');
    return dto;
  }
}
