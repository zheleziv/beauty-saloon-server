import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { OrderDto, CreateOrderDto } from 'src/shared/dto';
import { RecordStatus } from 'src/shared/enums';
import { OrdersService, CustomersService, StaffService, ServicesService } from 'src/services';
import { ICustomerEntity, IOrderEntity } from 'src/shared/interfaces';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

  constructor(
    private ordersService: OrdersService,
    private customerService: CustomersService,
    private staffService: StaffService,
    private servicesService: ServicesService
  ) { }

  @Get()
  @ApiOperation({ summary: 'Возвращает онлайн-записи на услуги' })
  @ApiOkResponse({ type: [OrderDto] })
  // @ApiQuery({ name: 'from', description: 'Дата начала периода дат', required: false })
  // @ApiQuery({ name: 'to', description: 'Дата конца периода дат', required: false })
  // @ApiQuery({ name: 'status', enum: RecordStatus, description: 'Статус заявки', required: false })
  // @ApiQuery({ name: 'query', description: 'Поисковый запрос по ФИО клиента', required: false })
  public getOrders(
    // @Query('from') from: string,
    // @Query('to') to: string,
    // @Query('status') status: RecordStatus,
    // @Query('query') query: string
  ): OrderDto[] {
    return this.ordersService.getAll().map(order => this._getOrderDto(order));
  }

  @Post()
  @ApiOperation({ summary: 'Создаёт онлайн-запись на услугу' })
  @ApiBadRequestResponse({ description: 'Имя или номер клиента не заданы' })
  @ApiNotFoundResponse({ description: 'Мастер или услуга не найдены' })
  @ApiCreatedResponse({ description: 'Запись создана', type: OrderDto })
  public createOrder(@Body() createOrderDto: CreateOrderDto): OrderDto {
    if (!createOrderDto.name) {
      throw new HttpException('Необходимо задать имя клиента', HttpStatus.BAD_REQUEST);
    }

    if (!createOrderDto.phone) {
      throw new HttpException('Необходимо задать номер телефона', HttpStatus.BAD_REQUEST);
    }

    let customer: ICustomerEntity;
    let foundCustomers = this.customerService.query(item => item.phone === createOrderDto.phone);

    if (!foundCustomers.length) {
      customer = this.customerService.create({
        firstName: createOrderDto.name,
        phone: createOrderDto.phone
      });
    } else {
      customer = foundCustomers[0];
    }

    if (createOrderDto.masterId && !this.staffService.get(createOrderDto.masterId)) {
      throw new HttpException(`Мастер по id ${createOrderDto.masterId} не найден`, HttpStatus.NOT_FOUND);
    }

    if (createOrderDto.serviceId && !this.servicesService.get(createOrderDto.serviceId)) {
      throw new HttpException(`Услуга по id ${createOrderDto.serviceId} не найдена`, HttpStatus.NOT_FOUND);
    }

    const createdOrder = this.ordersService.create({
      createdDate: new Date(),
      visitDate: createOrderDto.visitDate,
      status: RecordStatus.Opened,
      masterId: createOrderDto.masterId,
      serviceId: createOrderDto.serviceId,
      customerId: customer.id
    });

    return this._getOrderDto(createdOrder);
  }

  private _getOrderDto(order: IOrderEntity) {
    const orderDto = new OrderDto(order);

    if (order.masterId) {
      orderDto.master = this.staffService.get(order.masterId);
    }

    if (order.customerId) {
      orderDto.customer = this.customerService.get(order.customerId);
    }

    if (order.serviceId) {
      orderDto.service = this.servicesService.get(order.serviceId);
    }

    return orderDto;
  }

}
