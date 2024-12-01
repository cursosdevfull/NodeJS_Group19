import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/one-to-one/medic.entity';
import { SpecialtyEntity } from './entity/one-to-one/specialty.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);
      const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);

      const specialty = await repositorySpecialty.findOne({ where: { id: 4 } });

      /*       const specialty = new SpecialtyEntity();
      specialty.name = "Pediatría";
      specialty.description = "Especialidad de los niños"; */

      const medic = new MedicEntity();
      medic.firstname = "Armando";
      medic.lastname = "Tejada";
      medic.cmp = "abc456";
      medic.specialty = specialty;

      await repositorySpecialty.save(specialty);
      await repositoryMedic.save(medic);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
