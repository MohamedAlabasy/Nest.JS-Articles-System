import { IsNotEmpty, IsInt, Length } from "class-validator";

export class CreateEmailActivateDto {

    @IsInt()
    @Length(6, 6, { message: 'code must be 6 number' })
    @IsNotEmpty()
    readonly code: number;

    @IsInt()
    @IsNotEmpty()
    readonly user: number;
}
