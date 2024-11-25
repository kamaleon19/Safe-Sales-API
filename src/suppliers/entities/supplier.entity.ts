import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
