import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SpecialtyEntity } from "./specialty.entity";

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

  @OneToOne(() => SpecialtyEntity, (specialty) => specialty.medic)
  @JoinColumn()
  specialty: SpecialtyEntity;
}
