import { Controller, Get, Param, HttpException, HttpStatus, Body, Post, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { StaffDto, CreateStaffDto } from 'src/shared/dto';
import { StaffService } from 'src/services';
import { Utils } from 'src/shared/utils';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {

  constructor(private readonly staffService: StaffService) { }

  @Get()
  @ApiQuery({ name: 'search', description: 'Фильтрует клиента по ФИО или номер телефона', required: false })
  @ApiOperation({ summary: 'Возвращает список сотрудников' })
  @ApiOkResponse({ type: [StaffDto] })
  getstaffs(@Query('search') search: string): StaffDto[] {
    return this.staffService
      .getAll()
      .map(staff => new StaffDto(staff))
      .filter(staff => {
        const findByName = Utils.compare(staff.fullName, search);
        return findByName;
      });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Возвращает сотрудника по id' })
  @ApiOkResponse({ type: StaffDto })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  getstaff(@Param('id') id: number): StaffDto {
    const staff = this.staffService.get(+id);

    if (!staff) {
      throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
    }

    return new StaffDto(staff);
  }

  @Post()
  @ApiOperation({ summary: 'Создаёт нового сотрудника' })
  @ApiCreatedResponse({ description: 'Сотрудник успешно создан', type: StaffDto })
  createstaff(@Body() createstaffDto: CreateStaffDto): StaffDto {
    const createdstaff = this.staffService.create(createstaffDto);
    return new StaffDto(createdstaff);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаляет сотрудника' })
  @ApiOkResponse({ description: 'Сотрудник успешно удалён' })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  deletestaff(@Param('id') id: number) {
    const staff = this.staffService.get(+id);

    if (staff) {
      this.staffService.delete(+id);
      return;
    }

    throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
  }

}
