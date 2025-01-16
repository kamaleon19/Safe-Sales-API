import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { Customer } from "src/customers/entities/customer.entity"
import { Product } from "src/products/entities/product.entity"

import { PaymentStaus, PaymentMethod } from "../enums"
import { ApiProperty } from "@nestjs/swagger"

@Entity()
export class Sale {


    @ApiProperty({
        example: 'f7dc0372-c0f4-4b8b-a78a-45b06e69e5f8',
        description: 'ID de la venta'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string


    @ApiProperty({
        example: 1000,
        description: 'Monto total de la venta',
        required: true,
        type: 'number'
    })
    @Column({
        type: 'numeric',
        nullable: false
    })
    totalAmount: number


    @ApiProperty({
        example: 10,
        description: 'Cantidad total de productos',
        required: true,
        type: 'number'
    })
    @Column({
        type: 'numeric',
        nullable: false
    })
    totalItems: number



    @ApiProperty({
        example: 'PAGADO',
        description: 'Estado de la venta',
        required: true,
        enum: PaymentStaus,
        type: 'string'
    })
    @Column({
        type: 'enum',
        enum: PaymentStaus
    })
    status: PaymentStaus



    @ApiProperty({
        example: 'EFECTIVO',
        description: 'Método de pago',
        required: true,
        enum: PaymentMethod,
        type: 'string'
    })
    @Column({
        type: 'enum',
        enum: PaymentMethod
    })
    payment: PaymentMethod



    @ApiProperty({
        example: '2021-09-01',
        description: 'Fecha de creación de la venta',
        required: true,
        type: 'string'
    })
    @Column({
        type: 'date',
        nullable: false,
        default: new Date()
    })
    createdAt: Date



    @ApiProperty({
        example: '2021-09-01',
        description: 'Fecha de pago de la venta',
        required: false,
        type: 'string'
    })
    @Column({
        type: 'date',
        nullable: true
    })
    paidAt: Date



    @ApiProperty({
        example: 'f7dc0372-c0f4-4b8b-a78a-45b06e69e5f8',
        description: 'ID del cliente asociado a la venta',
    })
    @ManyToOne(
        () => Customer,
        ( customer ) => customer.sale
    )
    customer?: Customer



    @ApiProperty({
        example: 'f7dc0372-c0f4-4b8b-a78a-45b06e69e5f8',
        description: 'ID de los productos asociados a la venta',
    })
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
