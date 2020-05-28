import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { IOrderEntity } from 'src/shared/interfaces';
import { RecordStatus, RecordStatusFinish } from 'src/shared/enums';

@Injectable()
export class OrdersService extends InMemoryDbService<IOrderEntity> {
  constructor() {
    super();

    this.createMany([
      {
        customerId: 1,
        masterId: 2,
        serviceId: 3,
        status: RecordStatus.Opened,
        createdDate: new Date(),
        visitDate: '2020-05-29T10:27:33.153Z'
      },
      {
        customerId: 1,
        masterId: 1,
        serviceId: 3,
        status: RecordStatus.Closed,
        finishStatus: RecordStatusFinish.Success,
        createdDate: new Date(),
        visitDate: '2020-05-22T10:27:33.153Z'
      },
      {
        customerId: 2,
        masterId: 4,
        serviceId: 5,
        status: RecordStatus.Opened,
        createdDate: new Date(),
        visitDate: '2020-05-25T10:27:33.153Z'
      }
    ])
  }
}