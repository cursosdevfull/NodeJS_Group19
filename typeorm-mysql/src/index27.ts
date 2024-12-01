import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const result = await manager
        .createQueryBuilder()
        .update(MedicEntity)
        .set({ firstname: "Dr. John Doe" })
        .where("id = :id", { id: 4 })
        .execute();

      console.log(result);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
