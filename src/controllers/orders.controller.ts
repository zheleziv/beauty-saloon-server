import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { OrderDto, CreateOrderDto } from 'src/dto';
import { RecordStatus, RecordStatusFinish } from 'src/enums';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

  // constructor(
  //   private services: InMemoryDBService<IOrderEntity>
  // ) {
  //   this.services.create({
  //     visitDate: (new Date()).toString(),
  //     status: RecordStatus.Opened,
  //     finishStatus: null,
  //     masterId: 1,
  //     serviceId: 1
  //   })
  // }

  // @Get()
  // @ApiOperation({ summary: 'Возвращает онлайн-записи на услуги' })
  // @ApiOkResponse({ type: [OrderDto] })
  // // @ApiQuery({ name: 'from', description: 'Дата начала периода дат', required: false })
  // // @ApiQuery({ name: 'to', description: 'Дата конца периода дат', required: false })
  // // @ApiQuery({ name: 'status', enum: RecordStatus, description: 'Статус заявки', required: false })
  // // @ApiQuery({ name: 'query', description: 'Поисковый запрос по ФИО клиента', required: false })
  // public getOrders(
  //   // @Query('from') from: string,
  //   // @Query('to') to: string,
  //   // @Query('status') status: RecordStatus,
  //   // @Query('query') query: string
  // ) {
  //   return this.services.getAll();
  // }

  // @Post()
  // @ApiOperation({ summary: 'Создаёт онлайн-запись на услугу' })
  // @ApiCreatedResponse({ description: 'Запись создана' })
  // public createOrder(@Body() createOrderDto: CreateOrderDto) {
  //   if (!createOrderDto.name) {
  //     throw new Error('Необходимо задать имя клиента');
  //   }

  //   if (!createOrderDto.phone) {
  //     throw new Error('Необходимо задать номер телефона');
  //   }    
    
  //   const createdOrder = this.services.create({
  //     visitDate: createOrderDto.visitDate,
  //     status: RecordStatus.Opened,
  //     masterId: createOrderDto.masterId,
  //     serviceId: createOrderDto.serviceId
  //   });

  //   return createdOrder;
  // }

}
