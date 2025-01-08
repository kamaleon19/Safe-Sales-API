import { IsNumber, IsPositive, IsString, MinLength } from "class-validator"

export class SaleItemsDto {
    @IsString()
    @MinLength(1)
    name: string

    @IsNumber()
    @IsPositive()
    quantity: number
}