import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre de usuario',
        type: String,
        minLength: 1,
        example: 'Jin Sakai'
    })
    @IsString()
    @MinLength(1)
    name:     string

    @ApiProperty({
        description: 'Correo electronico',
        type: String,
        minLength: 1,
        example: "joaquin@gmail.com"
    })
    @IsEmail()
    @MinLength(1)
    email:    string


    @ApiProperty({
        description: 'Contraseña del Usuario-La contraseña debe contener mayusculas, minusculas letras y numeros',
        type: String,
        minLength: 6,
        maxLength: 50,
        example: "Abc123"
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'La contraseña debe contener mayusculas, minusculas letras y numeros'
    })
    password: string

}