import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateCustomerDto {

    @IsString()
    @MinLength(1)
    fullname: string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    phone: number
    
}
