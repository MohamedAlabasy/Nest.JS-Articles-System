import { IsNotEmpty, IsString, Length, IsInt, IsIn, IsEnum } from "class-validator";
export enum EmojiType {
    LIKE = 'like',
    SMILE = 'smile',
    LOVE = 'love',
    ANGRY = 'angry',
}
export class CreateLikeDto {

    // @IsEnum([],)
    @IsEnum(['like', 'smile', 'love', 'angry'], { message: 'type must be like or smile or love or angry' })
    @IsNotEmpty()
    readonly type: EmojiType;

    @IsInt()
    @IsNotEmpty()
    readonly user: number;

    @IsInt()
    @IsNotEmpty()
    readonly article: number;

}
