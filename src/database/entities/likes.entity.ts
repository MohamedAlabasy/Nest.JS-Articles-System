import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Articles } from './articles.entity';
import { Users } from './users.entity';

export enum EmojiType {
    LIKE = 'like',
    SMILE = 'smile',
    LOVE = 'love',
    ANGRY = 'angry',
}

@Entity({ name: 'likes' })
export class Likes {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({
        type: "enum",
        enum: EmojiType,
        default: EmojiType.LIKE,
    })
    type: EmojiType;

    // for relations
    @ManyToOne(() => Users, (user) => user.likes)
    user: Users

    @ManyToOne(() => Articles, (article) => article.likes)
    article: Articles
}