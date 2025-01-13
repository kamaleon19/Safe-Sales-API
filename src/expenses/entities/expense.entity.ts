import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ExpenseStaus } from '../enums/expense-status.enum';

@Entity()
export class Expense {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  type: string;
  
  @Column({
    type: 'enum',
    enum: ExpenseStaus,
    default: ExpenseStaus.PENDIENTE,
  })
  status: ExpenseStaus;

  @Column({
    type: 'bigint',
    nullable: false
  })
  amount: number


  @Column({
    type: 'date',
    default: new Date()
  })
  createdAt: Date;

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
