import { BaseDto } from "./base-dto";
import { ApiProperty } from "@nestjs/swagger";
import { IServiceEntity } from "../interfaces";

export class ServiceDto extends BaseDto {

  constructor(service?: IServiceEntity) {
    super();

    if (service) {
      Object.assign(this, service);
    }
  }

  @ApiProperty({ description: 'Название' })
  name: string;

  @ApiProperty({ description: 'Описание', required: false })
  description: string;

  @ApiProperty({ description: 'Стоимость' })
  price: number;

  @ApiProperty({ description: 'Фотография услуги', required: false })
  photo: string;

  @ApiProperty({ description: 'Услуга является популярной', required: false })
  isPopular: boolean;

} 

export class CreateServiceDto extends BaseDto {

  @ApiProperty({ description: 'Название' })
  name: string;

  @ApiProperty({ description: 'Описание', required: false })
  description: string;

  @ApiProperty({ description: 'Id категории услуг', required: false })
  categoryId: number;

  @ApiProperty({ description: 'Стоимость' })
  price: number;

  @ApiProperty({ description: 'Фотография услуги', required: false })
  photo: string;

  @ApiProperty({ description: 'Услуга является популярной', required: false })
  isPopular: boolean;

} 