import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';
import { SpecialtyEntity } from './entity/many-to-many/specialty.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);
      const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);

      const specialty01 = await repositorySpecialty.findOne({
        where: { id: 4 },
      });
      const specialty02 = await repositorySpecialty.findOne({
        where: { id: 3 },
      });

      const medic01 = new MedicEntity();
      medic01.firstname = "Claudia";
      medic01.lastname = "García";
      medic01.cmp = "abc456";
      medic01.specialties = [specialty01];

      const medic02 = new MedicEntity();
      medic02.firstname = "Lucía";
      medic02.lastname = "Pérez";
      medic02.cmp = "abc456";
      medic02.specialties = [specialty01, specialty02];

      await Promise.allSettled([
        repositoryMedic.save(medic01),
        repositoryMedic.save(medic02),
      ]);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
