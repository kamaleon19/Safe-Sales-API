import { ArrayMinSize, IsArray, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

import { SaleItemsDto } from "./sale-items.dto"
import { PaymentMethod, PaymentMethodList, PaymentStatusList, PaymentStaus } from "../enums"
import { ApiProperty } from "@nestjs/swagger"


export class CreateSaleDto {

    @ApiProperty({
        description: 'Estado de pago',
        example: 'PENDING',
        enum: PaymentStaus,
        type: String
    })
    @IsEnum( PaymentStatusList, {
        message: `Valid status are: ${PaymentStatusList}`
    })
    status: PaymentStaus


    @ApiProperty({
        description: 'Metodo de pago',
        example: 'EFECTIVO',
        enum: PaymentMethod,
        type: String
    })
    @IsEnum( PaymentMethodList, {
        message: `Valid payment methods are: ${PaymentMethodList}`
    })
    payment: PaymentMethod


    @ApiProperty({
        description: 'Nombre del cliente',
        example: 'Joaquin',
        type: String,
        minLength: 1,
        required: false
    })
    @IsString()
    @MinLength(1)
    @IsOptional()
    customer: string


    @ApiProperty({
        description: 'Items de la venta',
        type: SaleItemsDto,
        required: true,
        minLength: 1,
        isArray: true
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => SaleItemsDto)
    items: SaleItemsDto[]


}
