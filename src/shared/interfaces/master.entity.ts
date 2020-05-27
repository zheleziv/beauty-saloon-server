import { InMemoryDBEntity } from "./in-memory-entity.interface";

export interface IStaffEntity extends InMemoryDBEntity {
  firstName: string;
  patronymic: string;
  surName: string;
  position: string;
  startWorkDate: Date;
  photo: string;
}