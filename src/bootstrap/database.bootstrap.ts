import { DataSource } from 'typeorm';

import { envs } from '../config/environment-vars';
import { CourseEntity } from '../modules/course/entities/course.entity';
import { UserEntity } from '../modules/user/entities/user.entity';
import { Bootstrap } from './bootstrap';

export class DatabaseBootstrap implements Bootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<DataSource> {
    const dbConfig = envs.db;
    const appDatSource = new DataSource({
      type: 'mysql',
      ...dbConfig,
      entities: [UserEntity, CourseEntity],
    });

    DatabaseBootstrap.appDataSource = appDatSource;

    const init = appDatSource.initialize();
    init.then(() =>
      console.log(
        `Database initialized running on ${dbConfig.host}:${dbConfig.port}`,
      ),
    );

    return init;
  }

  static get dataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }
}
