/*
    Crear un clase User que me permita crear un usuario
*/

class Database {
  public operations!: {
    create: (
      firstname: string,
      lastname: string,
      email: string,
      userId: number,
      createdAt: Date
    ) => void;
    update: (
      firstname: string,
      lastname: string,
      userId: number,
      updatedAt: Date
    ) => void;
    delete: (userId: number, deletedAt: Date) => void;
  };

  constructor() {
    this.databaseConnection();
  }

  private async databaseConnection() {
    const credentials = {
      user: "abc",
      password: "todoonAda",
      ssid: "ssid_operations",
    };
    this.operations = await this.getConnection(credentials);
  }

  private async getConnection(credentials: { user: string; password: string }) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });

    await promise;
    return {
      create: (
        firstname: string,
        lastname: string,
        email: string,
        userId: number,
        createdAt: Date
      ) => {
        console.log("user created");
      },
      update: (
        firstname: string,
        lastname: string,
        userId: number,
        updatedAt: Date
      ) => {
        console.log("user updated");
      },
      delete: (userId: number, deletedAt: Date) => {
        console.log("user deleted");
      },
    };
  }
}

class Message {
  sentEmail(message: string, email: string) {
    console.log("message send", message);
    this.imap("reply@email.com", email, message);
  }

  private imap(sender: string, receiver: string, message: string) {}
}

class User {
  private readonly userId: number;
  private firstname: string;
  private lastname: string;
  private email: string;
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;
  private db: Database;
  private message: Message;

  constructor(firstname: string, lastname: string, email: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.userId = new Date().getTime();
    this.createdAt = new Date();

    this.db = new Database();
    this.message = new Message();
  }

  get properties() {
    return {
      userId: this.userId,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  create() {
    this.db.operations.create(
      this.firstname,
      this.lastname,
      this.email,
      this.userId,
      this.createdAt
    );
    this.message.sentEmail("Bienvenido", this.email);
  }

  update(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.updatedAt = new Date();
    this.db.operations.update(
      this.firstname,
      this.lastname,
      this.userId,
      this.createdAt
    );
    this.message.sentEmail("Datos actualizados", this.email);
  }

  delete() {
    this.deletedAt = new Date();
    this.db.operations.delete(this.userId, this.deletedAt);
    this.message.sentEmail("Gracias", this.email);
  }
}

const user = new User("Pedro", "Ortiz", "pedro.ortiz@email.com");

//console.log("user created", user.properties)

setTimeout(() => {
  user.create();
  //console.log("user updated", user.properties)
}, 2000);

setTimeout(() => {
  user.update("Javier", "Castro");
  //console.log("user updated", user.properties)
}, 3000);

setTimeout(() => {
  user.delete();
  //console.log("user deleted", user.properties)
}, 4000);
