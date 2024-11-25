import { IsNumber, IsPositive, IsString, MinLength } from "class-validator"

export class CreateSupplierDto {

    @IsString()
    @MinLength(1)
    name: string

    @IsNumber()
    @IsPositive()
    phone: number

    @IsString()
    @MinLength(1)
    products: string
}
