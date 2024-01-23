import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({value}: {value:string}) => hashSync(value), {groups: ["transform"]})
    password: string

    @IsString()
    @IsNotEmpty()
    telephone: string
}
