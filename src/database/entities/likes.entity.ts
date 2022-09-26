import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'likes' })
export class Likes {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    type: string;
}