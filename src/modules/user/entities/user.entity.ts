import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleEntity } from '../../role/entities/role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  firstname!: string;

  @Column({ type: 'varchar', length: 100 })
  lastname!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 100 })
  password!: string;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @Column({ type: 'varchar', length: 100 })
  refreshToken!: string;

  @ManyToMany((type) => RoleEntity, (role) => role.users)
  @JoinTable()
  roles!: RoleEntity[];
}
