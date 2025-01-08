import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Customer } from "src/customers/entities/customer.entity"
import { PaymentStaus, PaymentMethod } from "../enums"
import { Product } from "src/products/entities/product.entity"

@Entity()
export class Sale {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'int',
        nullable: false
    })
    totalAmount: number

    @Column({
        type: 'int',
        nullable: false
    })
    totalItems: number


    @Column({
        type: 'enum',
        enum: PaymentStaus
    })
    status: PaymentStaus


    @Column({
        type: 'enum',
        enum: PaymentMethod
    })
    payment: PaymentMethod


    @Column({
        type: 'date',
        nullable: false,
        default: new Date()
    })
    createdAt: Date


    @Column({
        type: 'date',
        nullable: true
    })
    paidAt: Date


    @ManyToOne(
        () => Customer,
        ( customer ) => customer.sale
    )
    customer?: Customer


    @OneToMany(
        () => Product,
        ( product ) => product.sale,
        
    )
    products: Product[]


    @BeforeInsert()
    setPaidAt() {
        if(this.status === PaymentStaus.PAGADO){
            this.paidAt = new Date()
        }   
    }


    @BeforeUpdate()
    updatePaidAt() {
        if(this.status === PaymentStaus.PAGADO){
            this.paidAt = new Date()
        } 
    }
}
