// infraestructura
class MedicInfrastructure implements MedicRepository {
  insert(medic: Medic): number {
    console.log("medic inserted");
    return new Date().getTime();
  }

  update(medicId: number, medic: Medic): void {
    console.log("medic updated");
  }

  delete(medicId: number): void {
    console.log("medic deleted");
  }

  getByCMP(cmp: string): Medic {
    console.log("medic found");
    return new Medic(
      "Luis",
      "Ronceros",
      20,
      "luis.ronceros@company.com",
      "male",
      "abc-123",
      [
        {
          country: "PERU",
          city: "Lima",
          location: "San Isidro",
          street: "La Dalias",
          numb: 235,
        },
      ]
    );
  }
}

// aplicacion
class MedicAplicacion {
  repository: MedicRepository = new MedicInfrastructure();
  medicId: number | undefined;

  createMedic(medic: Medic) {
    this.medicId = this.repository.insert(medic);
  }

  updateMedic(medic: Medic): void {
    if (!this.medicId) return;
    this.repository.update(this.medicId, medic);
  }

  removeMedic(): void {
    if (!this.medicId) return;
    this.repository.delete(this.medicId);
  }

  findMedicByCMP(cmp: string): Medic {
    return this.repository.getByCMP(cmp);
  }
}

// dominio
type MedicRepository = {
  insert(medic: Medic): number;
  update(medicId: number, medic: Medic): void;
  delete(medicId: number): void;
  getByCMP(cmp: string): Medic;
};

class Address {
  country!: string;
  city!: string;
  location!: string;
  street!: string;
  numb!: number;
}

class Medic {
  medicId: number | undefined;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  gender: string;
  cmp: string;
  addresses: Address[];

  constructor(
    firstname: string,
    lastname: string,
    age: number,
    email: string,
    gender: string,
    cmp: string,
    addresses: Address[]
  ) {
    const regex = /^[0-9a-zA-Z._-]+@(company\.com|pe\.company\.com)$/;
    if (!email.match(regex)) throw "Email doen't belong to company";
    if (age < 18) throw "Age must be greater or equal than 18";
    if (firstname.length < 3) throw "Firstname must have 3 characters at least";
    if (lastname.length < 3) throw "Lastname must have 3 characters at least";
    if (addresses.length < 1) throw "Must have one address at least";

    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.email = email;
    this.gender = gender;
    this.cmp = cmp;
    this.addresses = addresses;
  }
}

const medic = new Medic(
  "Carla",
  "Tamayo",
  34,
  "carla.tamayo@pe.company.com",
  "female",
  "abc-123",
  [
    {
      country: "Perú",
      city: "Trujillo",
      location: "Simbal",
      street: "avenida España",
      numb: 123,
    },
  ]
);

const aplicacion = new MedicAplicacion();
aplicacion.createMedic(medic);
medic.firstname = "Carmen";
aplicacion.updateMedic(medic);
aplicacion.removeMedic();
