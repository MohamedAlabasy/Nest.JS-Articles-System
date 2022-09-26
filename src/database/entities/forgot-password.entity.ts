import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'forgot_password' })
export class ForgotPassword {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    code: string;

    @Column()
    created_at: Date;

    @Column()
    expire_at: Date;
}