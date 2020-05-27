import { InMemoryDBEntity } from "./in-memory-entity.interface";

export interface IServiceEntity extends InMemoryDBEntity {
  name: string;
  description: string;
  price: number;
  photo: string;
  isPopular: boolean;
}