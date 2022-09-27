import { IsNotEmpty, IsString, IsEmail, Length, IsInt } from "class-validator";

export class CreateArticleDto {

    @Length(3, 255, { message: 'title must be longer than 3 characters' })
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsInt()
    @IsNotEmpty()
    readonly user: number;

}
