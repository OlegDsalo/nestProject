import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

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
}
