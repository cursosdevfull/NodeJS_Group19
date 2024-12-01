import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/medic.entity";
import { SpecialtyEntity } from "./entity/specialty.entity";

AppDataSource.initialize()
  .then(async () => {
    const medic = new MedicEntity();
    medic.firstname = "Thomas";
    medic.lastname = "Doe";
    medic.cmp = "abc123";

    const specialty = new SpecialtyEntity();
    specialty.name = "Pediatría";
    specialty.description = "Especialidad de los niños";

    try {
      const repositoryMedic = AppDataSource.getRepository(MedicEntity);
      const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);

      await Promise.all([
        repositoryMedic.save(medic),
        repositorySpecialty.save(specialty),
      ]);
      /*       await repositoryMedic.save(medic);
      await repositorySpecialty.save(specialty); */
      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
