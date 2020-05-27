import { Injectable } from '@nestjs/common';
import { InMemoryDbService } from './in-memory-db.service';
import { IOrderEntity } from 'src/shared/interfaces';

@Injectable()
export class OrdersService extends InMemoryDbService<IOrderEntity> { }