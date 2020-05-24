import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {

  @Get()
  @ApiOperation({ summary: 'Возвращает клиентов салона' })
  getCustomers() {
  }

}
