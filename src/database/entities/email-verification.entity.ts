import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'email_verification' })
export class EmailVerification {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    code: string;

    @Column()
    created_at: Date;

    @Column()
    expire_at: Date;
}