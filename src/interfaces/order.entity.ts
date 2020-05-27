import { RecordStatus, RecordStatusFinish } from "src/enums";
import { InMemoryDBEntity } from "./in-memory-entity.interface";

export interface IOrderEntity extends InMemoryDBEntity {
  visitDate: string;
  status: RecordStatus;
  finishStatus?: RecordStatusFinish;
  masterId: number;
  serviceId: number;
}
