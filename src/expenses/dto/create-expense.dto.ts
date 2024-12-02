import { IsEnum, IsString, MinLength } from "class-validator"
import { ExpenseStatusList, ExpenseStaus } from "../enums/expense-status.enum"

export class CreateExpenseDto {

    @IsString()
    @MinLength(1)
    name: string

    @IsString()
    @MinLength(1)
    type: string

    @IsEnum( ExpenseStatusList, {
        message: `Valid status are ${ExpenseStatusList}`
    })
    status: ExpenseStaus

}
