// adaptador
function MedicAdaptador(): MedicPuerto {
  const insert = (
    firstname: string,
    lastname: string,
    email: string,
    age: number,
    gender: string,
    cmp: string
  ): number => {
    console.log("medic inserted");
    return new Date().getTime();
  };
  const update = (
    medicId: number,
    firstname: string,
    lastname: string
  ): void => {
    console.log("medic updated");
  };
  const remove = (medicId: number): void => {
    console.log("medic remove");
  };

  return { insert, update, remove };
}

// puerto
type MedicPuerto = {
  insert(
    firstname: string,
    lastname: string,
    email: string,
    age: number,
    gender: string,
    cmp: string
  ): number;
  update(medicId: number, firstname: string, lastname: string): void;
  remove(medicId: number): void;
};

// aplicación
function MedicAplicacion(
  firstname: string,
  lastname: string,
  email: string,
  age: number,
  gender: string,
  cmp: string
) {
  const regex = /^[0-9A-Za-z.]+@(company\.com|pe\.company\.com)/;
  if (!email.match(regex)) throw "Email doesn't belong to the company";
  if (age < 18) throw "Age must be greater or equal than 18";

  const port: MedicPuerto = MedicAdaptador();
  const medic: any = {
    firstname,
    lastname,
    email,
    age,
    gender,
    cmp,
  };

  const create = () => {
    medic.medicId = port.insert(
      medic.firstname,
      medic.lastname,
      medic.email,
      medic.age,
      medic.gender,
      medic.cmp
    );
  };

  const update = (firstname: string, lastname: string) => {
    if (!medic.medicId) return;
    port.update(medic.medicId, firstname, lastname);
    medic.firstname = firstname;
    medic.lastname = lastname;
  };

  const remove = () => {
    if (!medic.medicId) return;
    port.remove(medic.medicId);
  };

  return { create, update, remove };
}

const application = MedicAplicacion(
  "Luis",
  "Huillca",
  "luis.huillca@company.com",
  20,
  "MALE",
  "abc-123"
);
application.create();
application.update("Carlos", "Zamalloa");
application.remove();
