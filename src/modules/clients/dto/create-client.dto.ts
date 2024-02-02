import { ApiProperty } from "@nestjs/swagger"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateClientDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({value}: {value:string}) => hashSync(value), {groups: ["transform"]})
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    telephone: string
}
