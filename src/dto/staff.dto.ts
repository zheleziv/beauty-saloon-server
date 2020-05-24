import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "./base-dto";

export class StaffDto extends BaseDto {
  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Отчество' })
  patronomyc: string;

  @ApiProperty({ description: 'Фамилия' })
  surName: string;

  @ApiProperty({ description: 'Должность' })
  position: string;

  @ApiProperty({ description: 'Дата начала работы в компании' })
  startWorkDate: Date;

  @ApiProperty({ description: 'Путь до фотки сотрудника' })
  photo: string;
}

export class CreateStaffDto {
  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Отчество' })
  patronomyc: string;

  @ApiProperty({ description: 'Фамилия' })
  surName: string;

  @ApiProperty({ description: 'Должность' })
  position: string;

  @ApiProperty({ description: 'Дата начала работы в компании' })
  startWorkDate: Date;

  @ApiProperty({ description: 'Путь до фотки сотрудника' })
  photo: string;
}