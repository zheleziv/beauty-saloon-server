import { InMemoryDBEntity } from "./in-memory-entity.interface";

export interface IStaffEntity extends InMemoryDBEntity {
  firstName: string;
  patronomyc: string;
  surName: string;
  position: string;
  startWorkDate: Date;
  photo: string;
}