import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'teacher' })
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  firstname!: string;

  @Column({ type: 'varchar', length: 100 })
  lastname!: string;

  @Column({ type: 'int' })
  age!: number;

  @Column({ type: 'varchar', length: 1 })
  gender!: string;

  @Column({ type: 'varchar', length: 100 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  urlProfile!: string;

  @Column({ type: 'boolean', default: true })
  active!: boolean;
}
