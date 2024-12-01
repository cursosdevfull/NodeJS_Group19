import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/many-to-many/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      await manager
        .createQueryBuilder()
        .delete()
        .from(MedicEntity)
        .where("id >= :id", { id: 7 })
        .execute();

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
