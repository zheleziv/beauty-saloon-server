import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MastersModule } from './masters/masters.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    MastersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
