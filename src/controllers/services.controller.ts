import { Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { IServiceCategoryEntity } from 'src/shared/interfaces';
import { ServiceDto } from 'src/shared/dto';
import { ServicesService } from 'src/services';

@ApiTags('Services')
@Controller('services')
export class ServicesController {

  constructor(
    private services: ServicesService
  ) { }

  // @Get('withCategories')
  // @ApiOperation({ summary: 'Возвращает услуги сгруппированные по категориям' })
  // getServicesWithCategories() {
  // }

  // @Get('forCategory/:id')
  // @ApiOperation({ summary: 'Возвращает услуги для категории' })
  // getCategoryServices() { }

  @Get()
  @ApiOperation({ summary: 'Возвращает все услуги' })
  @ApiOkResponse({ type: ServiceDto })
  getServices(): ServiceDto[] {
    return this.services.getAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: 'Возвращает услугу по id' })
  // getServiceById(@Param('id') id: number) { }

  // @Post()
  // @ApiOperation({ summary: 'Добавляет услугу' })
  // createService() { }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Редактирует услугу' })
  // updateService(@Param('id') id: number) { }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Удаляет услугу' })
  // deleteService(@Param('id') id: number) { }

}
