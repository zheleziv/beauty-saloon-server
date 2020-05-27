import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './services';

@Controller()
export class AppController {

  constructor(private readonly customersService: CustomersService) {
    console.log(this.customersService.getAll());

  }

}
