import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { ICustomerEntity } from 'src/shared/interfaces';

@Injectable()
export class CustomersService extends InMemoryDbService<ICustomerEntity> {

  constructor() {
    super();
  }

}