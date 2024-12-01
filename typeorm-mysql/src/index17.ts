import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);

      const medics = await repositoryMedic
        .createQueryBuilder("doctor")
        .where("doctor.id > 4")
        .getMany();

      console.log(JSON.stringify(medics, null, "\t"));

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
