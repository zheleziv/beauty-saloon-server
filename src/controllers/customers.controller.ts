import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from 'src/services';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {

  constructor(private readonly customersService: CustomersService) {
  }

  @Get()
  @ApiOperation({ summary: 'Возвращает клиентов салона' })
  getCustomers() {
    return this.customersService.getAll()
  }

}
