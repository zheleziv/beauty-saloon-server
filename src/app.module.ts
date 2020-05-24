import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  CustomersController,
  RecordsController,
  ServiceController,
  ServiceCategoryController,
  StaffController
} from './controllers';

@Module({
  imports: [
    InMemoryDBModule.forRoot()
  ],
  controllers: [
    AppController,
    CustomersController,
    RecordsController,
    ServiceController,
    ServiceCategoryController,
    StaffController,
  ],
  providers: [AppService],
})
export class AppModule { }
