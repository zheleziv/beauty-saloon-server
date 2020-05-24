import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface IMasterEntity extends InMemoryDBEntity {
  firstName: string;
  patronomyc: string;
  surName: string;
  position: string;
  startWorkDate: Date;
  photo: string;
}