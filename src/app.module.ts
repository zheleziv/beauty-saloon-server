import { Module } from '@nestjs/common';

import {
  CustomersController,
  OrdersController,
  ServiceCategoryController,
  ServicesController,
  StaffController
} from './controllers';

import { CustomersService } from './services';

@Module({
  controllers: [
    CustomersController,
    OrdersController,
    ServiceCategoryController,
    ServicesController,
    StaffController
  ],
  providers: [
    CustomersService
  ]
})
export class AppModule { }
