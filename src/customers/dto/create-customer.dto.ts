import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"
import { CustomerFrequency, CustomerFrequencyList } from "../enum/customer-frequency.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCustomerDto {


    @ApiProperty({
        description: 'Nombre del cliente',
        example: 'Ramon Zapico',
        type: 'string',
        minLength: 1,
        required: true
    })
    @IsString()
    @MinLength(1)
    fullname: string


    @ApiProperty({
        description: 'Frecuencia de compra del cliente',
        example: 'ALTA, MEDIA, BAJA',
        type: 'string',
        required: false  
    })
    @IsEnum(CustomerFrequencyList, {
        message: `Valid frequencies are: ${CustomerFrequencyList}`
    })
    @IsOptional()
    frequency: CustomerFrequency


    @ApiProperty({
        description: 'Telefono del cliente',
        example: 123456789,
        type: 'number',
        required: false
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    phone: number


    
}
