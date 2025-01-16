import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator"

export class SaleItemsDto {

    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Coca Cola',
        type: String,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    name: string


    @ApiProperty({
        description: 'Cantidad de productos',
        example: 2,
        type: Number,
        minimum: 1
    })
    @IsNumber()
    @IsPositive()
    quantity: number
}