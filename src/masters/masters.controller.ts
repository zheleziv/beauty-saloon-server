import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { IMasterEntity } from './master.entity';
import mastersMock from './masters.mock';

@Controller('masters')
export class MastersController {

  constructor(
    private mastersService: InMemoryDBService<IMasterEntity>
  ) {
    this.mastersService.createMany(mastersMock);
  }

  @Get()
  getMasters(): IMasterEntity[] {
    return this.mastersService.getAll();
  }

  @Get(':id')
  getMaster(@Param('id') id: number): IMasterEntity {
    const master = this.mastersService.get(+id);

    if (!master) {
      throw new HttpException('Сотрудник не найден', HttpStatus.NOT_FOUND);
    }
    
    return master;
  }

}
