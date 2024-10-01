import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
    
}
