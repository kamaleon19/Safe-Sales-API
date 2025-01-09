import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Sale } from 'src/sales/entities/sale.entity';
import { CustomerFrequency } from '../enum/customer-frequency.enum';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true
  })
  fullname: string;

  @Column({
    type: 'bigint',
    unique: true,
    nullable: true
  })
  phone: number;

  @Column({
    type: 'enum',
    enum: CustomerFrequency,
    default: CustomerFrequency.BAJA,
  })
  frequency: CustomerFrequency;

  @Column({
    type: 'int',
    default: 0
  })
  purchases: number;
  
  @Column({
    type: 'boolean',
    default: true
  })
  status: boolean;

  @Column({
    type: 'date',
    default: new Date()
  })
  createdAt: Date;


  @Column({
    type: 'date',
    default: new Date()
  })
  updatedAt: Date;

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
