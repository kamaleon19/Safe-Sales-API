import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'bigint',
    nullable: false,
  })
  phone: number;

  @Column({
    type: 'text',
  })
  products: string;


  @Column({
    type: 'boolean',
    default: true
  })
  status: boolean;


  @Column({
    type: 'date',
    default: new Date(),
  })
  createdAt: Date;


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
