import { IsNotEmpty, IsInt, IsString, Length, Matches } from "class-validator";
import { PASSWORD_RULE, PASSWORD_MESSAGE } from "../../../utilities/common";

export class ResetPasswordDto {

    @IsInt()
    @IsNotEmpty()
    readonly code: number;

    @IsNotEmpty()
    @IsInt()
    readonly user: number;

    @IsNotEmpty()
    @IsString()
    @Length(8, 24)
    @Matches(PASSWORD_RULE, PASSWORD_MESSAGE)
    readonly password: string;
}
