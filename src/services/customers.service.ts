import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { ICustomerEntity } from 'src/shared/interfaces';

@Injectable()
export class CustomersService extends InMemoryDbService<ICustomerEntity> {
  constructor() {
    super();

    this.createMany([
      {
        firstName: 'Иван',
        surName: 'Иванов',
        patronymic: 'Иванович',
        phone: '+7 (992) 333-33-45'
      },
      {
        firstName: 'Петр',
        surName: 'Петров',
        patronymic: 'Петрович',
        phone: '+7 (323) 442-11-22'
      }
    ])
  }
}