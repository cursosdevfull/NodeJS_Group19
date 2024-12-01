import { AppDataSource } from './data-source';
import { MedicEntity } from './entity/many-to-many/medic.entity';

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const medics = await manager
        .createQueryBuilder(MedicEntity, "medic")
        .select(["medic.id", "medic.firstname"])
        .where("medic.id >= :medicId")
        .andWhere("medic.lastname= :medicLastname")
        //.setParameters({ medicId: 4, medicLastname: "Tejada" })
        .setParameter("medicId", 4)
        .setParameter("medicLastname", "Tejada")
        .getMany();

      console.log(JSON.stringify(medics, null, "\t"));

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
