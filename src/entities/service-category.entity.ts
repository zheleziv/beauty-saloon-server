import { InMemoryDBEntity } from "@nestjs-addons/in-memory-db";

export interface IServiceCategoryEntity extends InMemoryDBEntity {
  name: string;
}
