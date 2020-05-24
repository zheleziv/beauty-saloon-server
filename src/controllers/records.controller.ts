import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { OrderDto } from 'src/dto';
import { RecordStatus } from 'src/enums';

@ApiTags('Orders')
@Controller('orders')
export class RecordsController {

  @Get()
  @ApiOperation({ summary: 'Возвращает онлайн-записи на услуги' })
  @ApiOkResponse({ type: [OrderDto] })
  @ApiQuery({ name: 'from', description: 'Дата начала периода дат' })
  @ApiQuery({ name: 'to', description: 'Дата конца периода дат' })
  @ApiQuery({ name: 'status', enum: RecordStatus, description: 'Статус заявки', required: false })
  @ApiQuery({ name: 'query', description: 'Поисковый запрос по ФИО клиента', required: false })
  public getOrders(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('status') status: RecordStatus,
    @Query('query') query: string
  ) {

  }

}
