import { Controller, Get, Post, Param, Query, HttpException, HttpStatus, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServiceCategoryDto } from 'src/shared/dto';
import { IServiceCategoryEntity } from 'src/shared/interfaces';

@ApiTags('Service Category')
@Controller('service-category')
export class ServiceCategoryController {

  // constructor(
  //   private categoriesService: InMemoryDBService<IServiceCategoryEntity>
  // ) {
  //   this.categoriesService.createMany([
  //     { name: 'Стрижка и укладка' },
  //     { name: 'Косметология' },
  //     { name: 'Маникюр и педикюр' },
  //     { name: 'Макияж' },
  //     { name: 'Брови и ресницы' },
  //     { name: 'Массаж' }
  //   ]);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Возвращает категории услуг' })
  // @ApiResponse({ status: HttpStatus.OK, type: [ServiceCategoryDto] })
  // getCategories() {
  //   return this.categoriesService.getAll();
  // }

  // @Post()
  // @ApiOperation({ summary: 'Создаёт новую категорию услуг' })
  // @ApiResponse({ status: HttpStatus.CREATED, description: 'Катагория услуг создана', type: ServiceCategoryDto })
  // createCategory(@Query('name') name: string) {
  //   const existedCategory = this.categoriesService.query(item => item.name === name);

  //   if (existedCategory.length) {
  //     throw new HttpException(`Категория с названием ${name} уже существует`, HttpStatus.BAD_REQUEST);
  //   }

  //   return this.categoriesService.create({ name });
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Редактирует название категории услуги' })
  // @ApiResponse({ status: HttpStatus.OK, description: 'Название категории успешно изменено' })
  // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Категория услуг не найдена' })
  // updateCategory(@Param('id') id: number, @Param('name') name: string) {
  //   const category = this.categoriesService.get(+id);

  //   if (category) {
  //     this.categoriesService.update({ id, name });
  //     return this.categoriesService.get(+id);
  //   }

  //   throw new HttpException('Категория на найдена', HttpStatus.NOT_FOUND);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Удаляет категорию услуги' })
  // @ApiResponse({ status: HttpStatus.OK, description: 'Категория услуг успешно удалена' })
  // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Категория услуг не найдена' })
  // deleteCategory(@Param('id') id: number) {
  //   const category = this.categoriesService.get(+id);

  //   if (category) {
  //     this.categoriesService.delete(+id);
  //     return;
  //   }

  //   throw new HttpException('Категория на найдена', HttpStatus.NOT_FOUND);
  // }

}
