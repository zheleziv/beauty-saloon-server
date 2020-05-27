import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ServiceDto } from 'src/shared/dto';
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

}
