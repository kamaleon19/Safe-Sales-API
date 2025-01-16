import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, MinLength, IsString } from "class-validator"

export class LoginUserDto{
    
    @ApiProperty({
        description: 'Correo electronico del Usuario',
        type: String,
        minLength: 1,
        example: "joaquin@gmail.com"
    })
    @IsEmail()
    @MinLength(1)
    email:    string


    @ApiProperty({
        description: 'Contraseña del Usuario',
        type: String,
        minLength: 1,
        example: "Abc123"
    })
    @IsString()
    password: string
    
}