import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { IServiceEntity } from 'src/shared/interfaces';

@Injectable()
export class ServicesService extends InMemoryDbService<IServiceEntity> {

  constructor() {
    super();

    this.createMany([
      {
        name: 'Женская стрижка',
        description: 'Короткие волосы',
        price: 1200
      },
      {
        name: 'Мужская стрижка',
        description: 'Короткие волосы',
        price: 1200
      },
      {
        name: 'Женская стрижка',
        description: 'Короткие волосы',
        price: 1200
      },
      {
        name: 'Детский Стиль',
        description: 'Короткие волосы',
        price: 1200
      },
      {
        name: 'Креативный Стиль',
        description: 'Короткие волосы',
        price: 1200
      },
      {
        name: 'Экспресс укладка',
        description: 'Короткие волосы',
        price: 1200
      }
    ]);
  }

}