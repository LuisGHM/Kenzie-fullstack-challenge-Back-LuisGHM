import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    telephone: string;

    @IsString()
    @IsNotEmpty()
    clientId: string;
}
