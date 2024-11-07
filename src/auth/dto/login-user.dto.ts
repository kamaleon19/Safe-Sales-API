import { IsEmail, MinLength, IsString } from "class-validator"

export class LoginUserDto{
    
    @IsEmail()
    @MinLength(1)
    email:    string

    @IsString()
    password: string
    
}