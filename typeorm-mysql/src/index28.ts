import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const medics = await manager
        .createQueryBuilder()
        .select([
          "medic.id",
          "medic.firstname",
          "medic.lastname",
          "specialty.id",
          "specialty.name",
        ])
        .from(MedicEntity, "medic")
        //.innerJoinAndSelect("medic.specialties", "specialty")
        .innerJoin("medic.specialties", "specialty")
        .where("medic.id = :id", { id: 4 })
        .orWhere("medic.lastname = :lastname", { lastname: "Tejada" })
        .getRawMany();

      console.log(medics);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
