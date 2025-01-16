import { IsEnum, IsNumber, IsPositive, IsString, MinLength } from "class-validator"
import { ExpenseStatusList, ExpenseStaus } from "../enums/expense-status.enum"
import { ApiProperty } from "@nestjs/swagger"

export class CreateExpenseDto {

    @ApiProperty({
        example: 'Factura de luz',
        description: 'Nombre del gasto',
        minLength: 1,
        type: String,
        required: true
    })
    @IsString()
    @MinLength(1)
    name: string

    @ApiProperty({
        example: 'Impuestos',
        description: 'Tipo de gasto',
        minLength: 1,
        type: String,
        required: true
    })
    @IsString()
    @MinLength(1)
    type: string

    @ApiProperty({
        example: 15000,
        description: 'Monto del gasto',
        type: Number,
        required: true
    })
    @IsNumber()
    @IsPositive()
    amount: number


    @ApiProperty({
        example: 'PAGADO',
        description: 'Estado del gasto',
        type: String,
        enum: ExpenseStatusList,
        required: true
    })
    @IsEnum( ExpenseStatusList, {
        message: `Valid status are ${ExpenseStatusList}`
    })
    status: ExpenseStaus

}
