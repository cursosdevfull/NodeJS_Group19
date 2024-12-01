import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const operation = await manager
        .createQueryBuilder()
        .select("sum(medic.id)", "total")
        .from(MedicEntity, "medic")
        .getRawOne();

      console.log(operation);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
