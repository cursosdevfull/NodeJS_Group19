import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "specialty" })
export class SpecialtyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ type: "text" })
    description: string
}