import { MoreThanOrEqual } from 'typeorm';

import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);

      const allMedics = await repositoryMedic.find({
        select: {
          id: true,
          firstname: true,
          specialties: { id: true, name: true },
        },
        where: { id: MoreThanOrEqual(5) },
        relations: ["specialties"],
      });

      console.log(JSON.stringify(allMedics, null, "\t"));

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
