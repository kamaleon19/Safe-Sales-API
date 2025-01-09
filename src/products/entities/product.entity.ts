import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Sale } from "src/sales/entities/sale.entity"

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    name: string

    @Column({
        type: 'float',
        nullable: false
    })
    price: number

    @Column({
        type: 'int'
    })
    stock: number

    @Column({
        type: 'text',
        array: true
    })
    supplier: string[]

    @Column({
        type: 'text'
    })
    trademark: string


    @Column({
        type: 'date',
        default: new Date(),
        nullable: false
    })
    createdAt : Date


    @Column({
        type: 'date',
        nullable: true
    })
    updatedAt: Date

    @Column({
        type: 'boolean',
        default: true
    })
    available: boolean

    @ManyToOne(
        () => Sale,
        ( sale ) => sale.products
    )
    sale: Sale


    @BeforeUpdate()
    updateTimestamp(){
        this.updatedAt = new Date()
    }   
    
}
