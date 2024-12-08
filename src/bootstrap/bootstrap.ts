import { DataSource } from 'typeorm';

export type Bootstrap = {
  initialize(): Promise<boolean | DataSource>;
};
