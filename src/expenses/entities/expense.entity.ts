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
    type: 'date',
    nullable: true,
  })
  paidAt?: string;


  @BeforeInsert()
  setPaymentDate() {
    if (this.status === ExpenseStaus.PAGADO) {
      const currentDate = new Date().toISOString().split('T')[0];
      this.paidAt = currentDate
    }
  }


  @BeforeUpdate()
  updatePaymentDate() {
    if (this.status === ExpenseStaus.PAGADO) {
      const currentDate = new Date().toISOString().split('T')[0];
      this.paidAt = currentDate
    }
  }
}
