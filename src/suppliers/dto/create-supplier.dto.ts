import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator"

export class CreateSupplierDto {


    @ApiProperty({
        example: 'Terrabusi',
        description: 'Nombre del Proveedor',
        type: String,
        minLength: 1,
        required: true
    })
    @IsString()
    @MinLength(1)
    name: string


    @ApiProperty({
        example: 123456789,
        description: 'Telefono del Proveedor',
        type: Number,
        required: true
    })
    @IsNumber()
    @IsPositive()
    phone: number


    @ApiProperty({
        example: 'Golosinas',
        description: 'Tipo de productos',
        type: String,
        minLength: 1,
        required: true
    })
    @IsString()
    @MinLength(1)
    products: string
}
