import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [DatabaseModule, CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
