// adaptador
class MedicInfrastructure implements MedicRepository {
  insert(
    firstname: string,
    lastname: string,
    email: string,
    age: number,
    gender: string,
    cmp: string
  ): number {
    console.log("medic inserted");
    return new Date().getTime();
  }
  update(medicId: number, firstname: string, lastname: string): void {
    console.log("medic updated");
  }
  delete(medicId: number): void {
    console.log("medic deleted");
  }

  toPrimitives() {}
}

// puerto
interface MedicRepository {
  insert(
    firstname: string,
    lastname: string,
    email: string,
    age: number,
    gender: string,
    cmp: string
  ): number;
  update(medicId: number, firstname: string, lastname: string): void;
  delete(medicId: number): void;
}

// aplicación
class MedicApplication {
  medicId: number | undefined;
  firstname: string;
  lastname: string;
  email: string;
  age: number;
  gender: string;
  cmp: string;
  repository: MedicRepository;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    age: number,
    gender: string,
    cmp: string
  ) {
    this.repository = new MedicInfrastructure();

    const regex = /^[0-9A-Za-z]+@(company\.com|pe\.company\.com)/;
    if (!email.match(regex)) throw "Email doesn't belong to the company";
    if (age < 18) throw "Age must be greater or equal than 18";

    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
    this.gender = gender;
    this.cmp = cmp;
  }

  create() {
    this.medicId = this.repository.insert(
      this.firstname,
      this.lastname,
      this.email,
      this.age,
      this.gender,
      this.cmp
    );
  }

  update(firstname: string, lastname: string) {
    if (!this.medicId) return;
    this.repository.update(this.medicId, firstname, lastname);
    this.firstname = firstname;
    this.lastname = lastname;
  }

  delete() {
    if (!this.medicId) return;
    this.repository.delete(this.medicId);
  }
}
