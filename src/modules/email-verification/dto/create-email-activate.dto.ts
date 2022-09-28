import { IsNotEmpty,IsInt } from "class-validator";

export class CreateEmailActivateDto {

    @IsNotEmpty()
    @IsInt()
    readonly code: number;

    @IsNotEmpty()
    @IsInt()
    readonly user: number;
}
