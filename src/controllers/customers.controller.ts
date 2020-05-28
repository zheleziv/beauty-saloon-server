import { Controller, Get, Post, Body, HttpException, HttpStatus, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse, ApiNotFoundResponse, ApiQuery } from '@nestjs/swagger';
import { CustomersService } from 'src/services';
import { CustomerDto, CreateCustomerDto } from 'src/shared/dto';
import { Utils } from 'src/shared/utils';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {

  constructor(private readonly customersService: CustomersService) { }

  @Get()
  @ApiOperation({ summary: 'Возвращает клиентов салона' })
  @ApiQuery({ name: 'search', description: 'Фильтрует клиента по ФИО или номер телефона', required: false })
  @ApiOkResponse({ type: [CustomerDto] })
  getCustomers(@Query('search') search: string): CustomerDto[] {
    return this.customersService
      .getAll()
      .map(customer => new CustomerDto(customer))
      .filter(customer => {
        const findByName = Utils.compare(customer.fullName, search);
        const findByPhone = Utils.compare(customer.phone, search);

        return findByName || findByPhone;
      });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Возвращает клиента по id' })
  @ApiNotFoundResponse({ description: 'Клиент не найден' })
  @ApiOkResponse({ type: CustomerDto })
  getCustomerById(@Param('id') id: number): CustomerDto {
    const existedCustomer = this.customersService.get(+id);

    if (!existedCustomer) {
      throw new HttpException('Клиент не найден', HttpStatus.NOT_FOUND);
    }

    return new CustomerDto(this.customersService.get(+id));
  }

  @Post()
  @ApiCreatedResponse({ type: CustomerDto, description: 'Клиент успешно создан' })
  @ApiBadRequestResponse({ description: 'Не задано имя, фамилия или номер телефона' })
  @ApiOperation({ summary: 'Создаёт нового клиента' })
  createCustomer(@Body() createCustomerDto: CreateCustomerDto): CustomerDto {
    if (!createCustomerDto.firstName) {
      throw new HttpException('Необходимо задать имя', HttpStatus.BAD_REQUEST);
    }

    if (!createCustomerDto.surName) {
      throw new HttpException('Необходимо задать фамилию', HttpStatus.BAD_REQUEST);
    }

    if (!createCustomerDto.phone) {
      throw new HttpException('Необходимо задать номер телефона', HttpStatus.BAD_REQUEST);
    }

    const existedCustomer = this.customersService.query(item => item.phone === createCustomerDto.phone);

    if (existedCustomer.length) {
      throw new HttpException('Клиент с таким номером телефона уже существует', HttpStatus.BAD_REQUEST);
    }

    const createdCustomer = this.customersService.create(createCustomerDto);
    return new CustomerDto(createdCustomer);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновляет данные клиента' })
  @ApiNotFoundResponse({ description: 'Клиент не найден' })
  @ApiOkResponse({ description: 'Данные клиента изменены', type: CustomerDto })
  updateCustomer(@Param('id') id: number, @Body() updateCustomer: CreateCustomerDto): CustomerDto {
    const existedCustomer = this.customersService.get(+id);

    if (!existedCustomer) {
      throw new HttpException('Пользователь с таким id не найден', HttpStatus.NOT_FOUND);
    }

    this.customersService.update({ id, ...updateCustomer });
    return new CustomerDto(this.customersService.get(+id));
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Клиент не найден' })
  @ApiOkResponse({ description: 'Клиент удалён из базы' })
  removeCustomer(@Param('id') id: number) {
    const existedCustomer = this.customersService.get(+id);

    if (!existedCustomer) {
      throw new HttpException('Пользователь с таким id не найден', HttpStatus.NOT_FOUND);
    }

    this.customersService.delete(+id);
    return;
  }

}
