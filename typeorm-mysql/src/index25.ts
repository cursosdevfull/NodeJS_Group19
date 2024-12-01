import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const medics = await manager
        .createQueryBuilder(MedicEntity, "medic")
        .innerJoin("medic.specialties", "Specialty")
        .select([
          "medic.id",
          "medic.firstname",
          "Specialty.id",
          "Specialty.name",
        ])
        .getMany();

      console.log(JSON.stringify(medics, null, "\t"));

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
