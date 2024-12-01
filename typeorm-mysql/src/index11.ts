import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';
import { SpecialtyEntity } from './entity/many-to-many/specialty.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);
      const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);

      const allMedics = await repositoryMedic.find({
        select: { id: true, lastname: true, cmp: true },
        order: { lastname: "DESC", firstname: "DESC", cmp: "DESC" },
      });

      console.log(JSON.stringify(allMedics, null, "\t"));

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
