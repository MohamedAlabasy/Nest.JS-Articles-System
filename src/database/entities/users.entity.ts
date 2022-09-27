import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Articles } from './articles.entity';
import { Comments } from './comments.entity';
import { EmailVerification } from './email-verification.entity';
import { Likes } from './likes.entity';
import { ForgotPassword } from './forgot-password.entity';

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

    // @Column({ select: false })
    @Column()
    password: string;

    @Column({ default: false })
    is_admin: boolean;

    @Column({ nullable: true, default: null })
    token: string;

    // for relations
    @OneToMany(() => Articles, (articles) => articles.user)
    articles: Articles[];

    @OneToMany(() => Comments, (comments) => comments.user)
    comments: Comments[];

    @OneToMany(() => Likes, (likes) => likes.user)
    likes: Likes[];

    @OneToMany(() => EmailVerification, (emailVerification) => emailVerification.user)
    emailVerification: EmailVerification[];

    @OneToMany(() => ForgotPassword, (forgotPassword) => forgotPassword.user)
    forgotPassword: ForgotPassword[];
}