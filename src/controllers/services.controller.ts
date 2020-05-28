import { Controller, Get, Post, Body, Patch, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ServiceDto, CreateServiceDto } from 'src/shared/dto';
import { ServicesService } from 'src/services';

@ApiTags('Services')
@Controller('services')
export class ServicesController {

  constructor(private readonly services: ServicesService) { }

  @Get()
  @ApiOperation({ summary: 'Возвращает все услуги' })
  @ApiOkResponse({ type: ServiceDto })
  getServices(): ServiceDto[] {
    return this.services.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Возвращает клиента по id' })
  @ApiNotFoundResponse({ description: 'Услуга не неайдена' })
  @ApiOkResponse({ type: ServiceDto })
  getCustomerById(@Param('id') id: number): ServiceDto {
    const existedCustomer = this.services.get(+id);

    if (!existedCustomer) {
      throw new HttpException('Услуга не неайдена', HttpStatus.NOT_FOUND);
    }

    return new ServiceDto(this.services.get(+id));
  }

  @Post()
  @ApiOperation({ summary: 'Создаёт новую услугу' })
  @ApiCreatedResponse({ description: 'Услуга создана', type: ServiceDto })
  createService(@Body() createServiceDto: CreateServiceDto): ServiceDto {
    const createdService = this.services.create(createServiceDto);
    return new ServiceDto(createdService);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновляет данные услуги' })
  @ApiNotFoundResponse({ description: 'Услуга не неайдена' })
  @ApiOkResponse({ description: 'Услуга изменена', type: ServiceDto })
  updateService(@Param('id') id: number, @Body() updateServiceDto: CreateServiceDto): ServiceDto {
    const existedService = this.services.get(+id);

    if (!existedService) {
      throw new HttpException('Услуга не неайдена', HttpStatus.NOT_FOUND);
    }

    this.services.update({ id, ...updateServiceDto });
    return new ServiceDto(this.services.get(+id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаляет услугу' })
  @ApiNotFoundResponse({ description: 'Услуга не неайдена' })
  @ApiOkResponse({ description: 'Услуга удалена' })
  removeService(@Param('id') id: number) {
    const existedService = this.services.get(+id);

    if (!existedService) {
      throw new HttpException('Услуга не неайдена', HttpStatus.NOT_FOUND);
    }

    this.services.delete(+id);
    return;
  }

}
