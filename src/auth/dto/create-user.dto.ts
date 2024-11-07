import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    @MinLength(1)
    name:     string

    @IsEmail()
    @MinLength(1)
    email:    string

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'La contraseña debe contener mayusculas, minusculas letras y numeros'
    })
    password: string

}