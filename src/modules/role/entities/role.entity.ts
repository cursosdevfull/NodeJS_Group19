import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 20 })
  name!: string;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @ManyToMany((type) => UserEntity, (user) => user.roles)
  users!: UserEntity[];
}
