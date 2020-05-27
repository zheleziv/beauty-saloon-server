import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { StaffDto } from 'src/shared/dto';
import { StaffService } from 'src/services';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {

  constructor(private readonly staffService: StaffService) { }

  @Get()
  @ApiOperation({ summary: 'Возвращает список сотрудников' })
  @ApiOkResponse({ type: [StaffDto] })
  getMasters(): StaffDto[] {
    return this.staffService.getAll();
  }

}
