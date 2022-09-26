import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { Articles } from './articles.entity';
import { Comments } from './comments.entity';
import { Likes } from './likes.entity';

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

    // for relations
    @OneToMany(() => Articles, (articles) => articles.user)
    articles: Articles[];

    @OneToMany(() => Comments, (comments) => comments.user)
    comments: Comments[];

    @OneToMany(() => Likes, (likes) => likes.user)
    likes: Likes[];
}