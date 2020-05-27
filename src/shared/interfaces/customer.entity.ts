import { InMemoryDBEntity } from "./in-memory-entity.interface";

export interface ICustomerEntity extends InMemoryDBEntity {
  firstName: string;
  patronymic: string;
  surName: string;
  phone: string;
}
