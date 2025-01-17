import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Sale } from "src/sales/entities/sale.entity"
import { ApiProperty } from "@nestjs/swagger"

@Entity()
export class Product {

    @ApiProperty({
        example: '7323a5ab-f4cc-412b-883f-565c4115529a',
        description: 'ID del Producto',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string


    @ApiProperty({
        example: 'Alfajor',
        description: 'Nombre del Producto',
        uniqueItems: true,
        required: true,
        type: 'string'
    })
    @Column({
        type: 'text',
        nullable: false,
        unique: true
    })
    name: string

    @ApiProperty({
        example: 800,
        description: 'Precio del Producto',
        type: 'number',
        required: true
    })
    @Column({
        type: 'numeric',
        nullable: false
    })
    price: number


    @ApiProperty({
        example: 50,
        description: 'Stock del Producto',
        type: 'number',
        required: true
    })
    @Column({
        type: 'numeric',
    })
    stock: number


    @ApiProperty({
        example: 'Arcor',
        description: 'Proveedor del Producto',
        required: true,
        type: String
    })
    @Column({
        type: 'text',
        nullable: false
    })
    supplier: string


    @ApiProperty({
        example: 'Terrabusi',
        description: 'Marca del Producto',
        type: 'string',
        required: true
    })
    @Column({
        type: 'text'
    })
    trademark: string


    @ApiProperty({
        example: '2021-09-01',
        description: 'Fecha de Creación del Producto',
        type: 'string',
        required: true
    })
    @Column({
        type: 'date',
        default: new Date(),
        nullable: false
    })
    createdAt : Date


    @ApiProperty({
        example: '2021-09-01',
        description: 'Fecha de Actualización del Producto',
        type: 'string',
        required: true
    })
    @Column({
        type: 'date',
        nullable: true
    })
    updatedAt: Date


    @ApiProperty({
        example: true,
        description: 'Disponibilidad del Producto',
        type: 'boolean',
        required: true
    })
    @Column({
        type: 'boolean',
        default: true
    })
    available: boolean


    @ApiProperty({
        example: '7323a5ab-f4cc-412b-883f-565c4115529a',
        description: 'ID de la Venta',
        type: 'string',
        required: true
    })
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
