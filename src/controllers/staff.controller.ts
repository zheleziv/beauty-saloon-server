import { Controller, Get, Param, HttpException, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';

import mastersMock from '../misc/masters.mock';
import { IStaffEntity } from 'src/entities';
import { StaffDto, CreateStaffDto } from 'src/dto';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {

  constructor(
    private mastersService: InMemoryDBService<IStaffEntity>
  ) {
    this.mastersService.createMany(mastersMock);
  }

  @Get()
  @ApiOperation({ summary: 'Возвращает список сотрудников' })
  @ApiOkResponse({ type: [StaffDto] })
  getMasters(): StaffDto[] {
    return this.mastersService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Возвращает сотрудника по id' })
  @ApiOkResponse({ type: StaffDto })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  getMaster(@Param('id') id: number): StaffDto {
    const master = this.mastersService.get(+id);

    if (!master) {
      throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
    }

    return master;
  }

  @Post()
  @ApiOperation({ summary: 'Создаёт нового сотрудника' })
  @ApiCreatedResponse({ description: 'Сотрудник успешно создан', type: StaffDto })
  createMaster(@Body() createMasterDto: CreateStaffDto) {
    const createdMaster = this.mastersService.create(createMasterDto);
    return createdMaster;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаляет сотрудника' })
  @ApiOkResponse({ description: 'Сотрудник успешно удалён' })
  @ApiNotFoundResponse({ description: 'Сотрудник не найден' })
  deleteMaster(@Param('id') id: number) {
    const master = this.mastersService.get(+id);

    if (master) {
      this.mastersService.delete(+id);
      return;
    }

    throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
  }
}
