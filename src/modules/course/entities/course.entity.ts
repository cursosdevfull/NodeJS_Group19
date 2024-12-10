import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'boolean', default: true })
  active!: boolean;

  @Column({ type: 'text' })
  description!: string;
}
