import { RecordStatus, RecordStatusFinish } from "src/enums";

export interface IOrderEntity extends InMemoryDBEntity {
  visitDate: string;
  status: RecordStatus;
  finishStatus?: RecordStatusFinish;
  masterId: number;
  serviceId: number;
}
