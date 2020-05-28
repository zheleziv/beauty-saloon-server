import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "./base-dto";
import { RecordStatus, RecordStatusFinish } from "../enums";
import { IOrderEntity } from "../interfaces";
import { StaffDto } from "./staff.dto";
import { CustomerDto } from "./customer.dto";
import { ServiceDto } from "./service.dto";

export class OrderDto extends BaseDto {
  constructor(order?: IOrderEntity) {
    super();

    if (order) {
      this.id = order.id;
      this.createdDate = order.createdDate.toISOString();
      this.visitDate = order.visitDate;
      this.status = order.status;
      this.finishStatus = order.finishStatus;
    }
  }

  @ApiProperty({ description: 'Дата создания' })
  createdDate: string;

  @ApiProperty({ description: 'Клиент' })
  customer: CustomerDto;

  @ApiProperty({ description: 'Дата визита' })
  visitDate: string;

  @ApiProperty({ description: 'Статус записи' })
  status: RecordStatus;

  @ApiProperty({ description: 'Мастер услуги' })
  master: StaffDto;

  @ApiProperty({ description: 'Услуга' })
  service: ServiceDto;

  @ApiProperty({ description: 'Статус завершения записи' })
  finishStatus: RecordStatusFinish;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Имя клиента', required: false })
  name: string;

  @ApiProperty({ description: 'Номер телефона' })
  phone: string;

  @ApiProperty({ description: 'Id мастера', required: false })
  masterId?: number;

  @ApiProperty({ description: 'Id услуги', required: false })
  serviceId?: number;

  @ApiProperty({ description: 'Дата визита', required: false })
  visitDate?: string;
}

export class UpdateOrderDto {
  @ApiProperty({ description: 'Id клиента', required: false })
  customerId: number;

  @ApiProperty({ description: 'Id мастера', required: false })
  masterId?: number;

  @ApiProperty({ description: 'Id услуги', required: false })
  serviceId?: number;

  @ApiProperty({ description: 'Дата визита', required: false })
  visitDate?: string;

  @ApiProperty({ description: 'Статус записи', enum: RecordStatus, required: false })
  status?: RecordStatus;

  @ApiProperty({ description: 'Статус завершения записи', enum: RecordStatusFinish, required: false })
  finishStatus?: RecordStatusFinish;
}