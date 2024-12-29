import { Role } from '../../role/models/role';

export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  roles: Partial<Role>[];
  refreshToken?: string;
}
