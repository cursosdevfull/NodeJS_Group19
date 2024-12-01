import { Between } from 'typeorm';

import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);

      const page = 1;
      const pageSize = 2;

      const [allMedics, count] = await repositoryMedic.findAndCount({
        select: {
          id: true,
          firstname: true,
          specialties: { id: true, name: true },
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: { id: Between(4, 6) },
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
