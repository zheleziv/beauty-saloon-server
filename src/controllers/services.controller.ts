import { Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { IServiceCategoryEntity } from 'src/interfaces';
import { ServiceDto } from 'src/dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {

  // constructor(
  //   private services: InMemoryDBService<IServiceEntity>
  // ) {
  //   this.services.createMany([
  //     {
  //       name: 'Женская стрижка',
  //       description: 'Короткие волосы',
  //       price: 1200
  //     },
  //     {
  //       name: 'Мужская стрижка',
  //       description: 'Короткие волосы',
  //       price: 1200
  //     },
  //     {
  //       name: 'Женская стрижка',
  //       description: 'Короткие волосы',
  //       price: 1200
  //     },
  //     {
  //       name: 'Детский Стиль',
  //       description: 'Короткие волосы',
  //       price: 1200
  //     },
  //     {
  //       name: 'Креативный Стиль',
  //       description: 'Короткие волосы',
  //       price: 1200
  //     },
  //     {
  //       name: 'Экспресс укладка',
  //       description: 'Короткие волосы',
  //       price: 1200
  //     }
  //   ]);
  // }

  // @Get('withCategories')
  // @ApiOperation({ summary: 'Возвращает услуги сгруппированные по категориям' })
  // getServicesWithCategories() {
  // }

  // @Get('forCategory/:id')
  // @ApiOperation({ summary: 'Возвращает услуги для категории' })
  // getCategoryServices() { }

  // @Get()
  // @ApiOperation({ summary: 'Возвращает все услуги' })
  // @ApiOkResponse({ type: ServiceDto })
  // getServices() {
  //   return this.services.getAll();
  // }

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
