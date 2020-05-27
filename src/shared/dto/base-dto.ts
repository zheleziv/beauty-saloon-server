import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({ description: 'Идентификатор' })
  id: number;
}
