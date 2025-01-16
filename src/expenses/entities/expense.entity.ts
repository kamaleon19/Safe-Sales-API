import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExpenseStaus } from '../enums/expense-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Expense {

  @ApiProperty({
    example: 'd1b8f0d1-4b0f-4f4a-9d3b-4e4b1a4d4b1a',
    type: String,
    description: 'ID del gasto',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Factura de luz',
    type: String,
    description: 'Nombre del gasto',
    required: true,
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;


  @ApiProperty({
    example: 'Impuesto',
    type: String,
    description: 'Tipo de gasto',
    required: true,
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  type: string;
  

  @ApiProperty({
    example: 'PAGADO, PENDIENTE, CANCELADO',
    type: String,
    description: 'Estado del gasto',
    required: true,
  })
  @Column({
    type: 'enum',
    enum: ExpenseStaus,
    default: ExpenseStaus.PENDIENTE,
    nullable: false
  })
  status: ExpenseStaus;

  @ApiProperty({
    example: 100000,
    type: Number,
    description: 'Monto del gasto',
    required: true,
  })
  @Column({
    type: 'bigint',
    nullable: false
  })
  amount: number


  @ApiProperty({
    example: '2022-09-29',
    type: Date,
    description: 'Fecha de creación del gasto',
  })
  @Column({
    type: 'date',
    default: new Date()
  })
  createdAt: Date;


  @ApiProperty({
    example: '2022-09-29',
    type: Date,
    description: 'Fecha de pago del gasto',
  })
  @Column({
    type: 'date',
    nullable: true,
  })
  paidAt?: Date;


  @BeforeInsert()
  setPaymentDate() {
    if (this.status === ExpenseStaus.PAGADO) {
      this.paidAt = new Date()
    }
  }


  @BeforeUpdate()
  updatePaymentDate() {
    if (this.status === ExpenseStaus.PAGADO) {
      this.paidAt = new Date()
    }
  }
}
