import { RecordStatus, RecordStatusFinish } from "../enums";
import { InMemoryDBEntity } from "./in-memory-entity.interface";

export interface IOrderEntity extends InMemoryDBEntity {
  createdDate: Date;
  visitDate: string;
  status: RecordStatus;
  finishStatus?: RecordStatusFinish;
  customerId: number;
  masterId?: number;
  serviceId?: number;
}
