import { BaseDto } from "./base-dto";
import { ApiProperty } from "@nestjs/swagger";
import { ICustomerEntity } from "../interfaces";

export class CustomerDto extends BaseDto {
  constructor(customer?: ICustomerEntity) {
    super();

    if (customer) {
      Object.assign(this, customer);

      this.fullName = `${customer.surName || ''} ${customer.firstName || ''} ${customer.patronymic || ''}`.trim();
    }
  }

  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Отчество' })
  patronymic: string;

  @ApiProperty({ description: 'Фамилия' })
  surName: string;

  @ApiProperty({ description: 'Полное имя клиента' })
  fullName: string;

  @ApiProperty({ description: 'Номер телефона' })
  phone: string;
}

export class CreateCustomerDto {
  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Отчество', required: false })
  patronymic: string;

  @ApiProperty({ description: 'Фамилия' })
  surName: string;

  @ApiProperty({ description: 'Номер телефона' })
  phone: string;
}