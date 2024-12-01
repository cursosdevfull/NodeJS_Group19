import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async () => {
    const user = new UserEntity();
    user.firstname = "Jane";
    user.lastname = "Doe";
    user.email = "jane.doe@email.com";

    try {
      const repository = AppDataSource.getRepository(UserEntity);
      await repository.save(user);
      process.exit(0);
    } catch (error) {
      console.log(error);
    }

    /*  user.firstname = "John";
    user.lastname = "Doe";
    user.email = "john.doe@email.com"; */
  })
  .catch(console.log);
