import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const medics = await manager.query("select * from viewMedics");

      console.log(medics);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
