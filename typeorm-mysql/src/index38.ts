import { Brackets } from "typeorm";

import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/many-to-many/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const medics = await manager
        .createQueryBuilder(MedicEntity, "medic")
        .select(["medic.id", "medic.firstname", "medic.lastname"])
        .where("medic.id > :id", { id: 4 })
        .orWhere(
          new Brackets((query) => {
            query
              .where("medic.firstname = :firstname", { firstname: "Armando" })
              .andWhere("medic.lastname = :lastname", { lastname: "Tejada" });
          })
        )
        .getRawMany();

      console.log(medics);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
