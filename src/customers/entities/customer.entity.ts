import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Sale } from 'src/sales/entities/sale.entity';
import { CustomerFrequency } from '../enum/customer-frequency.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Customer {

  @ApiProperty({
    example: '0f91bf2e-fca2-4681-8882-925eb5225579',
    description: 'ID del cliente',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({
    example: 'Juan Perez',
    description: 'Nombre del cliente',
    type: 'string',
    uniqueItems: true,
    required: true
  })
  @Column({
    type: 'text',
    nullable: false,
    unique: true
  })
  fullname: string;

  @ApiProperty({
    example: 3886821175,
    type: 'number',
    description: 'Telefono del cliente',
    uniqueItems: true,
  })
  @Column({
    type: 'bigint',
    unique: true,
    nullable: true
  })
  phone: number;


  @ApiProperty({
    example: 'BAJA, MEDIA, ALTA', 
    description: 'Frecuencia de compra del cliente',
    type: 'string',
  })
  @Column({
    type: 'enum',
    enum: CustomerFrequency,
    default: CustomerFrequency.BAJA,
  })
  frequency: CustomerFrequency;


  @ApiProperty({
    example: 5,
    description: 'Cantidad de compras realizadas por el cliente',
    type: 'number',
  })
  @Column({
    type: 'int',
    default: 0
  })
  purchases: number;
  
  @ApiProperty({
    example: true,
    description: 'Estado del cliente',
    type: 'boolean',
  })
  @Column({
    type: 'boolean',
    default: true
  })
  status: boolean;


  @ApiProperty({
    example: '2021-10-01',
    description: 'Fecha de creacion del cliente',
    type: 'string',
  })
  @Column({
    type: 'date',
    default: new Date()
  })
  createdAt: Date;



  @ApiProperty({
    example: '2021-10-10',
    description: 'Fecha de actualizacion del cliente',
    type: 'string',
  })
  @Column({
    type: 'date',
    default: new Date()
  })
  updatedAt: Date;


  @ApiProperty({
    example: '0f91bf2e-fca2-4681-8882-925eb5225579',
    description: 'ID de la venta asociada al cliente',
  })
  @OneToMany(
    () => Sale,
    ( sale ) => sale.customer
  )
  sale: Sale[]


  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  } 
}
