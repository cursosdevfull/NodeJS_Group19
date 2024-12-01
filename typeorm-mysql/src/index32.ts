import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const operation = await manager
        .createQueryBuilder()
        .select(["medic.id", "medic.lastname", "medic.firstname"])
        .from(MedicEntity, "medic")
        .orderBy("medic.lastname", "DESC")
        .addOrderBy("medic.firstname", "ASC")
        .getRawMany();

      console.log(operation);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
