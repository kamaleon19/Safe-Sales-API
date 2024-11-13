import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
