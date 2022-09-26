import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class Comments {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    comment: string;
}