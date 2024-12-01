import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const [result, header] = await manager.query("call getMedic(?)", [5]);
      console.log(result);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
