import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/many-to-many/medic.entity";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const sql = manager
        .createQueryBuilder()
        .insert()
        .into(MedicEntity)
        .values([
          {
            firstname: "Dr. House",
            lastname: "Marvel",
            cmp: "123456",
          },
          { firstname: "Dr. Strange", lastname: "Marvel", cmp: "654321" },
        ])
        .execute();
      //.getSql();

      console.log(sql);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
