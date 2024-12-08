import { PageResult } from '../../../core/interfaces/page-result';
import { User } from '../models/user';

export type UserPort = {
  save(user: User): Promise<User>;
  delete(userId: number): Promise<void>;
  get(userId: number): Promise<User | null>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
  existsByEmail(email: string): Promise<boolean>;
  getByPage(page: number, pageSize: number): Promise<PageResult<User>>;
};
