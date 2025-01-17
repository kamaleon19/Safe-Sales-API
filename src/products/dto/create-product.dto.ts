import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {

  @ApiProperty({
    example: 'Cerveza Heineken',
    description: 'Nombre del producto',
    type : String,
    minLength: 1,
    required: true,
  })
  @IsString()
  @MinLength(1)
  name: string;


  @ApiProperty({
    example: 1000,
    description: 'Precio del producto',
    type : Number,
    required: true,
  })
  @IsPositive()
  @IsNumber()
  price: number;

  
  @ApiProperty({
    example: 50,
    description: 'Stock del producto',
    type : Number,
    required: true, 
  })
  @IsPositive()
  @IsNumber()
  stock: number;


  @ApiProperty({
    example: ['Arcor', 'Terrabusi'],
    description: 'Proveedor del Producto',
    type : Array,
    required: true,
  })
  @IsString()
  @IsOptional()
  supplier: string;


  @ApiProperty({
    example: 'Quilmes',
    description: 'Marca del producto',
    type : String,
    required: true,
  })
  @IsString()
  @IsOptional()
  trademark: string;

}
