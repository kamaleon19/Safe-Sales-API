import { IsDateString } from "class-validator";


export class DateFilterDto {
  
    
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}