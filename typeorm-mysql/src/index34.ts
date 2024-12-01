import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const operation = await manager.query("select * from medic where id>3");
      console.log(operation);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
