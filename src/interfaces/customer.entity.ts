import { InMemoryDBEntity } from "./in-memory-entity.interface";

export interface ICustomerEntity extends InMemoryDBEntity {
  firstName: string;
  patronomyc: string;
  surName: string;
  phone: string;
}
