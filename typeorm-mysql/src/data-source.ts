import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { MedicEntity } from './entity/many-to-many/medic.entity';
import { SpecialtyEntity } from './entity/many-to-many/specialty.entity';
import { UserEntity } from './entity/user.entity';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 4010,
  username: "user",
  password: "12345",
  database: "db",
  synchronize: true,
  logging: true,
  entities: [UserEntity, MedicEntity, SpecialtyEntity],
});
