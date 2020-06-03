import * as moment from 'moment';
import { API_DATE_FORMAT } from './constants';

type FilterDataType = string | number | boolean;

export enum FilterOperator {
  Contains = 'contains',
  NotContains = 'notContains',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith',
  Equals = 'equals',
  NotEqual = 'notEqual',
  LessThan = 'lessThan',
  LessThanOrEqual = 'lessThanOrEqual',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqual = 'greaterThanOrEqual'
}

interface IPeriod {
  from: string,
  to: string
}

export class Utils {

  static getDateWithApiFormat(date: string) {
    return moment(date).format(API_DATE_FORMAT);
  }

  static getPeriodWithApiFormat(period: IPeriod): IPeriod {
    return {
      from: Utils.getDateWithApiFormat(period.from),
      to: Utils.getDateWithApiFormat(period.to)
    };
  }

  static compare(
    value: FilterDataType,
    filterText: FilterDataType,
    operator: FilterOperator = FilterOperator.Contains
  ): boolean {
    const formattedValue = Utils.toFilterValue(value);
    const formattedFilterText = Utils.toFilterValue(filterText);

    return this[operator](formattedValue, formattedFilterText);
  }

  static contains(value: string, filterText: string): boolean {
    return value.indexOf(filterText) !== -1;
  }

  static notContains(value: string, filterText: string): boolean {
    return value.indexOf(filterText) === -1;
  }

  static startsWith(value: string, filterText: string): boolean {
    return value.indexOf(filterText) === 0;
  }

  static endsWith(value: string, filterText: string): boolean {
    const index = value.lastIndexOf(filterText);
    return index >= 0 && index === (value.length - filterText.length);
  }

  static equals(value: string, filterText: string): boolean {
    return value === filterText;
  }

  static notEqual(value: string, filterText: string): boolean {
    return value !== filterText;
  }

  static lessThan(value: string, filterText: string): boolean {
    return value < filterText;
  }

  static lessThanOrEqual(value: string, filterText: string): boolean {
    return value <= filterText;
  }

  static greaterThan(value: string, filterText: string): boolean {
    return value > filterText;
  }

  static greaterThanOrEqual(value: string, filterText: string): boolean {
    return value >= filterText;
  }

  static missing(value: any): boolean {
    return value === undefined || value === null || value === '';
  }

  static toFilterValue(value: string | number | boolean): string {
    if (this.missing(value)) {
      return '';
    }

    return value
      .toString()
      .replace(/[-+_()]/g, '')
      .replace(/ё/gi, 'е')
      .toLocaleLowerCase();
  }
}