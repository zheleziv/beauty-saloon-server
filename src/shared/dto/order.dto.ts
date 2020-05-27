import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "./base-dto";
import { RecordStatus, RecordStatusFinish } from "../enums";
import { ICustomerEntity, IServiceEntity, IStaffEntity, IOrderEntity } from "../interfaces";

export class OrderDto extends BaseDto {
  constructor(order?: IOrderEntity) {
    super();

    if (order) {
      this.id = order.id;
      this.createdDate = order.createdDate;
      this.status = order.status;
      this.finishStatus = order.finishStatus;
    }
  }

  @ApiProperty({ description: 'Дата создания' })
  createdDate: Date;

  @ApiProperty({ description: 'Клиент' })
  customer: ICustomerEntity;

  @ApiProperty({ description: 'Дата визита' })
  visitDate: Date;

  @ApiProperty({ description: 'Статус записи' })
  status: RecordStatus;

  @ApiProperty({ description: 'Мастер услуги' })
  master: IStaffEntity;

  @ApiProperty({ description: 'Услуга' })
  service: IServiceEntity;

  @ApiProperty({ description: 'Статус завершения записи' })
  finishStatus: RecordStatusFinish;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Имя клиента' })
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