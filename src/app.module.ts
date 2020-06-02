import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';

import {
  CustomersController,
  OrdersController,
  ServicesController,
  StaffController
} from './controllers';

import {
  CustomersService,
  OrdersService,
  StaffService,
  ServicesService,
  UsersService
} from './services';

import {
  jwtConstants,
  AuthService,
  LocalStrategy,
  JwtStrategy
} from './services/auth';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [
    AppController,
    CustomersController,
    OrdersController,
    ServicesController,
    StaffController
  ],
  providers: [
    CustomersService,
    OrdersService,
    StaffService,
    ServicesService,
    AuthService,
    LocalStrategy,
    UsersService,
    JwtStrategy
  ]
})
export class AppModule { }
