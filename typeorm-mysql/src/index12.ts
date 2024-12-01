import { MoreThan } from 'typeorm';

import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);

      const [allMedics, count] = await repositoryMedic.findAndCount({
        take: 2,
        skip: 0,
        where: { id: MoreThan(5) },
        relations: ["specialties"],
      });
      console.log(`There are ${count} medics`);
      console.log(JSON.stringify(allMedics, null, "\t"));

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
