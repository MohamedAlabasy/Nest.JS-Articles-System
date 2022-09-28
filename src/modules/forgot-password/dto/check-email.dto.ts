import { IsNotEmpty, IsEmail } from "class-validator";

export class CheckEmailDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: number;
}
