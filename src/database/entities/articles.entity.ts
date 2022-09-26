import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'articles' })
export class Articles {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;
}