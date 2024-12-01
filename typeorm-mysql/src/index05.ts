import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/one-to-many/medic.entity';
import { SpecialtyEntity } from './entity/one-to-many/specialty.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);
      const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);

      const specialty01 = new SpecialtyEntity();
      specialty01.name = "Pediatría";
      specialty01.description = "Especialidad de los niños";
      //await repositorySpecialty.save(specialty01);

      const medic01 = new MedicEntity();
      medic01.firstname = "Armando";
      medic01.lastname = "Tejada";
      medic01.cmp = "abc456";
      medic01.specialty = specialty01;

      await repositoryMedic.save(medic01);

      const medic02 = new MedicEntity();
      medic02.firstname = "Armando";
      medic02.lastname = "Tejada";
      medic02.cmp = "abc456";
      medic02.specialty = specialty01;

      await repositoryMedic.save(medic02);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
