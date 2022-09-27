import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Comments } from './comments.entity';
import { Likes } from './likes.entity';
import { Users } from './users.entity';

@Entity({ name: 'articles' })
export class Articles {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    title: string;

    @Column()
    description: string;

    // for relations
    @ManyToOne(() => Users, (user) => user.articles)
    user: Users | number

    @OneToMany(() => Comments, (comments) => comments.article)
    comments: Comments[];

    @OneToMany(() => Likes, (likes) => likes.article)
    likes: Likes[];
}