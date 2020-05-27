import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "./base-dto";
import { CustomerDto } from "./customer.dto";
import { RecordStatus, RecordStatusFinish } from "src/enums";

export class OrderDto extends BaseDto {
  @ApiProperty({ description: 'Клиент' })
  customer: CustomerDto;

  @ApiProperty({ description: 'Дата визита' })
  visitDate: Date;

  @ApiProperty({ description: 'Статус записи' })
  status: RecordStatus;

  @ApiProperty({ description: 'Статус завершения записи' })
  finishStatus: RecordStatusFinish;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Имя клиента' })
  name: string;

  @ApiProperty({ description: 'Номер телефона' })
  phone: string;

  @ApiProperty({ description: 'Id мастера' })
  masterId: number;

  @ApiProperty({ description: 'Id услуги' })
  serviceId: number;

  @ApiProperty({ description: 'Дата визита' })
  visitDate: string;
}