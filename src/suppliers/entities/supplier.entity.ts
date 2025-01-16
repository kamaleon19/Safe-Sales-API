import { ApiProperty } from '@nestjs/swagger';
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
    

  @ApiProperty({
    example: '5f799441-1e78-4a49-9c7c-4b5154cea215',
    description: 'ID del Proveedor',

  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    example: 'Pepsico',
    description: 'Nombre del Proveedor',
    type: String,
    required: true,
    uniqueItems: true
  })
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  name: string;


  @ApiProperty({
    example: 123456789,
    description: 'Telefono del Proveedor',
    type: Number,
    required: true
  })
  @Column({
    type: 'bigint',
    nullable: false,
  })
  phone: number;


  @ApiProperty({
    example: 'Snacks',
    description: 'Tipo de Productos',
    type: String,
    required: true
  })
  @Column({
    type: 'text',
  })
  products: string;



  @ApiProperty({
    example: true,
    description: 'Estado del Proveedor',
    type: Boolean,
    required: true
  })
  @Column({
    type: 'boolean',
    default: true
  })
  status: boolean;



  @ApiProperty({
    example: '2025-01-06',
    description: 'Fecha de creacion',
    type: String,
    required: true
  })
  @Column({
    type: 'date',
    default: new Date(),
  })
  createdAt: Date;



  @ApiProperty({
    example: '2025-01-15',
    description: 'Fecha de actualizacion',
    type: String,
    required: false
  })
  @Column({
    type: 'date',
    nullable: true,
  })
  updateAt: Date;


  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date();
  }
}
