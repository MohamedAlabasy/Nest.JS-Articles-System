import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class Users {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: false })
    is_verification: boolean;

    @Column()
    password: string;

    @Column({ default: false })
    is_admin: boolean;

    @Column({ nullable: true, default: null })
    token: string;
}