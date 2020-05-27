import { Module } from '@nestjs/common';

import {
  CustomersController,
  OrdersController,
  ServiceCategoryController,
  ServicesController,
  StaffController
} from './controllers';

import {
  CustomersService,
  OrdersService,
  StaffService,
  ServicesService
} from './services';

@Module({
  controllers: [
    CustomersController,
    OrdersController,
    ServiceCategoryController,
    ServicesController,
    StaffController
  ],
  providers: [
    CustomersService,
    OrdersService,
    StaffService,
    ServicesService
  ]
})
export class AppModule { }
