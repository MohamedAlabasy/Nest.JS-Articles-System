import { IsNotEmpty, IsInt, IsString } from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty()
    @IsInt()
    readonly code: number;

    @IsNotEmpty()
    @IsInt()
    readonly user: number;

    @IsNotEmpty()
    @IsString()
    readonly password: number;
}
