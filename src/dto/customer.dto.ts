import { BaseDto } from "./base-dto";
import { ApiProperty } from "@nestjs/swagger";

export class CustomerDto extends BaseDto {
  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Отчество' })
  patronomyc: string;

  @ApiProperty({ description: 'Фамилия' })
  surName: string;

  @ApiProperty({ description: 'Полное имя клиента' })
  fullName: string;

  @ApiProperty({ description: 'Номер телефона' })
  phone: string;
}
