import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "medic" })
export class MedicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  firstname: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 100 })
  cmp: string;
}
