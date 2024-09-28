import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsPositive()
  @IsNumber()
  price: number;

  @IsPositive()
  @IsNumber()
  stock: number;

  @IsString({ each: true })
  @IsArray()
  supplier: string[];

  @IsString()
  @IsOptional()
  trademark: string;

}
