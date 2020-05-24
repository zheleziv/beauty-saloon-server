import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "./base-dto";

export class UpdateServiceCategoryDto {
  @ApiProperty({ description: 'Имя' })
  name: string;
}

export class ServiceCategoryDto extends BaseDto {
  @ApiProperty({ description: 'Имя' })
  name: string;
}
