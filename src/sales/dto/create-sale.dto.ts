import { ArrayMinSize, IsArray, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

import { SaleItemsDto } from "./sale-items.dto"
import { PaymentMethod, PaymentMethodList, PaymentStatusList, PaymentStaus } from "../enums"


export class CreateSaleDto {
    @IsEnum( PaymentStatusList, {
        message: `Valid status are: ${PaymentStatusList}`
    })
    status: PaymentStaus


    @IsEnum( PaymentMethodList, {
        message: `Valid payment methods are: ${PaymentMethodList}`
    })
    payment: PaymentMethod

    @IsString()
    @MinLength(1)
    @IsOptional()
    customer: string

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => SaleItemsDto)
    items: SaleItemsDto[]


}
