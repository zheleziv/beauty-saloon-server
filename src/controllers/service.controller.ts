import { Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InMemoryDBService, InMemoryDBEntity, InjectInMemoryDBService } from '@nestjs-addons/in-memory-db';
import { IServiceCategoryEntity } from 'src/entities';

interface IServiceEntity extends InMemoryDBEntity { }

@ApiTags('Service')
@Controller('service')
export class ServiceController {

  constructor(
    private services: InMemoryDBService<IServiceEntity>,
    private categories: InMemoryDBService<IServiceCategoryEntity>
  ) { }

  @Get('withCategories')
  @ApiOperation({ summary: 'Возвращает услуги сгруппированные по категориям' })
  getServicesWithCategories() {
  }

  @Get('forCategory/:id')
  @ApiOperation({ summary: 'Возвращает услуги для категории' })
  getCategoryServices() { }

  @Get(':id')
  @ApiOperation({ summary: 'Возвращает услугу по id' })
  getServiceById(@Param('id') id: number) { }

  @Post()
  @ApiOperation({ summary: 'Добавляет услугу' })
  createService() { }

  @Patch(':id')
  @ApiOperation({ summary: 'Редактирует услугу' })
  updateService(@Param('id') id: number) { }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаляет услугу' })
  deleteService(@Param('id') id: number) { }

}
