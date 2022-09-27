import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString, IsEmail, Length, Matches } from "class-validator";

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+]).{8,}$/;
export class CreateUsers {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;


    @IsNotEmpty()
    @IsString()
    @Length(8, 24)
    @Matches(PASSWORD_RULE, { message: 'Password should have 1 upper case, lowcase letter along with a number and special character.' })
    readonly password: string;
    
    // @Exclude()
    // readonly is_verification: boolean;
}
