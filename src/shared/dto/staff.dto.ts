import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "./base-dto";
import { IStaffEntity } from "../interfaces";

export class StaffDto extends BaseDto {
  constructor(staff?: IStaffEntity) {
    super();

    if (staff) {
      Object.assign(this, staff);
      this.fullName = `${staff.surName || ''} ${staff.firstName || ''} ${staff.patronymic || ''}`.trim();
    }
  }

  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Отчество', required: false })
  patronymic: string;

  @ApiProperty({ description: 'Фамилия' })
  surName: string;

  @ApiProperty({ description: 'Полное имя' })
  fullName: string;

  @ApiProperty({ description: 'Должность' })
  position: string;

  @ApiProperty({ description: 'Дата начала работы в компании', required: false })
  startWorkDate: Date;

  @ApiProperty({ description: 'Путь до фотки сотрудника', required: false })
  photo: string;
}

export class CreateStaffDto {
  @ApiProperty({ description: 'Имя' })
  firstName: string;

  @ApiProperty({ description: 'Отчество' })
  patronymic: string;

  @ApiProperty({ description: 'Фамилия' })
  surName: string;

  @ApiProperty({ description: 'Должность' })
  position: string;

  @ApiProperty({ description: 'Дата начала работы в компании', required: false })
  startWorkDate: Date;

  @ApiProperty({ description: 'Путь до фотки сотрудника', required: false })
  photo: string;
}