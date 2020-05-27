import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { ICustomerEntity } from 'src/interfaces';

@Injectable()
export class CustomersService extends InMemoryDbService<ICustomerEntity> {

  constructor() {
    super();

    this.create({
      firstName: 'Иван',
      patronomyc: 'Иванович',
      surName: 'Иванов',
      phone: '+7 (999) 999-99-99'
    });
  }

}