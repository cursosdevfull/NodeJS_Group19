import { PageResult } from '../interfaces/page-result';

export type BasePort<T> = {
  save(model: T): Promise<T>;
  delete(userId: number): Promise<void>;
  get(id: number): Promise<T | null>;
  list(): Promise<T[]>;
  getByPage(page: number, pageSize: number): Promise<PageResult<T>>;
};
