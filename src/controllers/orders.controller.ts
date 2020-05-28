import { Controller, Get, Post, Body, HttpException, HttpStatus, Query, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiQuery } from '@nestjs/swagger';
import { OrderDto, CreateOrderDto, StaffDto, CustomerDto, ServiceDto, UpdateOrderDto } from 'src/shared/dto';
import { RecordStatus, RecordStatusFinish } from 'src/shared/enums';
import { OrdersService, CustomersService, StaffService, ServicesService } from 'src/services';
import { ICustomerEntity, IOrderEntity } from 'src/shared/interfaces';
import { Utils } from 'src/shared/utils';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly customerService: CustomersService,
    private readonly staffService: StaffService,
    private readonly servicesService: ServicesService
  ) { }

  @Get()
  @ApiOperation({ summary: 'Возвращает онлайн-записи на услуги' })
  @ApiOkResponse({ type: [OrderDto] })
  @ApiQuery({ name: 'from', description: 'Дата начала периода дат посещения', required: false })
  @ApiQuery({ name: 'to', description: 'Дата конца периода дат посещения', required: false })
  @ApiQuery({ name: 'status', enum: RecordStatus, description: 'Статус заявки', required: false })
  @ApiQuery({ name: 'search', description: 'Поисковый запрос по ФИО клиента', required: false })
  public getOrders(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('status') status: RecordStatus,
    @Query('search') search: string
  ): OrderDto[] {
    return this.ordersService
      .getAll()
      .map(order => this._getOrderDto(order))
      .filter(order => Utils.compare(order.customer.fullName, search))
      .filter(order => status ? order.status === status : true)
      .filter(order => {
        let isFrom = true;
        let isTo = true;

        if (from && order.visitDate) {
          isFrom = (new Date(order.visitDate)).getTime() >= (new Date(from)).getTime();
        }

        if (from && order.visitDate) {
          isTo = (new Date(order.visitDate)).getTime() <= (new Date(to)).getTime();
        }

        return isFrom || isTo;
      })
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

  @Patch(':id')
  @ApiOkResponse({ description: 'Данные заявки изменены' })
  @ApiNotFoundResponse({ description: 'Заявка не найдена' })
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    const foundOrder = this.ordersService.get(+id);

    if (!foundOrder) {
      throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    }

    this.ordersService.update({ id, ...updateOrderDto });
    return this._getOrderDto(this.ordersService.get(+id));
  }

  @Patch('close/:id')
  @ApiQuery({ name: 'finishStatus', enum: RecordStatusFinish, description: 'Услуга оказана или нет' })
  @ApiNotFoundResponse({ description: 'Заявка не найдена' })
  closeOrder(@Param('id') id: number, @Query('finishStatus') finishStatus: RecordStatusFinish) {
    const foundOrder = this.ordersService.get(+id);

    if (!foundOrder) {
      throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    }

    this.ordersService.update({ ...foundOrder, finishStatus, status: RecordStatus.Closed });
    return new OrderDto(this.ordersService.get(+id));
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Заявка удалена' })
  @ApiNotFoundResponse({ description: 'Заявка не найдена' })
  removeOrder(@Param('id') id: number) {
    const foundOrder = this.ordersService.get(+id);

    if (!foundOrder) {
      throw new HttpException('Заявка не найдена', HttpStatus.NOT_FOUND);
    }

    this.ordersService.delete(+id);
    return;
  }

  private _getOrderDto(order: IOrderEntity) {
    const orderDto = new OrderDto(order);

    if (order.masterId) {
      orderDto.master = new StaffDto(this.staffService.get(order.masterId));
    }

    if (order.customerId) {
      orderDto.customer = new CustomerDto(this.customerService.get(order.customerId));
    }

    if (order.serviceId) {
      orderDto.service = new ServiceDto(this.servicesService.get(order.serviceId));
    }

    return orderDto;
  }

}
