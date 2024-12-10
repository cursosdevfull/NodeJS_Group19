import { BasePort } from '../../../core/port/base.port';
import { User } from '../models/user';

export type UserPort = BasePort<User> & {
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
  existsByEmail(email: string): Promise<boolean>;
};
