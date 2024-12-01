import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  firstname: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  /*   constructor(firstname: string, lastname: string, email: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  } */
}
