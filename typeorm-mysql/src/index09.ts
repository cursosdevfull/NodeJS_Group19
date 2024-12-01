import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';
import { SpecialtyEntity } from './entity/many-to-many/specialty.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);
      const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);

      const allSpecialties = await repositorySpecialty.findOne({
        where: { id: 4 },
        relations: ["medics"],
      });

      console.log(JSON.stringify(allSpecialties, null, "\t"));

      /*       const allMedics = await repositoryMedic.find({
        relations: ["specialties"],
      });

      console.log(JSON.stringify(allMedics, null, "\t")); */

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
