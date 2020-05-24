import { CustomerDto } from "./customer.dto";
import { BaseDto } from "./base-dto";
import { RecordStatus, RecordStatusFinish } from "src/enums";
import { ApiProperty } from "@nestjs/swagger";

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