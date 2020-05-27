import { InMemoryDBEntity } from "src/interfaces";

export class InMemoryDbService<T extends InMemoryDBEntity> {
  private _recordMap: { [id: number]: T } = {};

  set records(records: T[]) {
    if (!records || records.length === 0) {
      this._recordMap = {};
    }
    this._recordMap = records.reduce(
      (previous: { [id: number]: T }, current: T) => {
        return {
          ...previous,
          [current.id]: current,
        };
      },
      this._recordMap,
    );
  }
  get records(): T[] {
    return Object.keys(this._recordMap).map(key => this._recordMap[key]);
  }

  public create(record: Partial<T>): T {
    const id = record.id || this._getNextId();
    const newRecord: T = { ...record, id } as T;
    this._recordMap = {
      ...this._recordMap,
      [id]: newRecord,
    };
    return newRecord;
  }

  public createMany(records: Array<Partial<T>>): T[] {
    return records.map(record => this.create(record));
  }

  public update(record: T): void {
    this._recordMap = {
      ...this._recordMap,
      [record.id]: { ...record },
    };
  }

  public updateMany(records: T[]): void {
    for (const record of records) {
      this.update(record);
    }
  }

  public delete(id: number): void {
    const { [id]: removed, ...remainder } = this._recordMap;
    this._recordMap = {
      ...remainder,
    };
  }

  public deleteMany(ids: number[]): void {
    for (const id of ids) {
      this.delete(id);
    }
  }

  public get(id: number): T {
    return this._recordMap[id];
  }

  public getMany(ids: number[]): T[] {
    const records = ids
      .filter(id => this._recordMap[id])
      .map(id => {
        return this._recordMap[id];
      });

    return records;
  }

  public getAll(): T[] {
    return this.records || [];
  }

  public query(predicate: (record: T) => boolean) {
    return this.records.filter(predicate);
  }

  private _getNextId(): number {
    if (this.records && this.records.length > 0) {
      return Math.max(...this.records.map(r => r.id)) + 1;
    }

    return 1;
  }

} 