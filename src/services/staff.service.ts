import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { IStaffEntity } from 'src/shared/interfaces';
import mastersMock from 'src/shared/misc/staff.mock';

@Injectable()
export class StaffService extends InMemoryDbService<IStaffEntity> {

  constructor() {
    super();

    this.createMany(mastersMock);
  }

}