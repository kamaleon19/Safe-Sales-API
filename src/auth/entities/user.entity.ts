import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {


    @ApiProperty({
        example: '9d073c50-7bc6-4bb3-afb3-b69029bf5f96',
        description: "ID del usuario (uuid)",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id:       string


    @ApiProperty({
        example: 'Mario Santos',
        description: "Nombre del usuario",
    })
    @Column({
        type:    'text',
        nullable: false
    })
    name:     string


    @ApiProperty({
        example: 'joaquin@gmail.com',
        description: "Correo electrónico del usuario",
        uniqueItems: true
    })
    @Column({
        type:    'text',
        unique:   true,
        nullable: false
    })
    email:    string



    @ApiProperty({
        example: 'Abc123',
        description: "Contraseña del usuario",
    })
    @Column({
        type:    'text',
        nullable: false,
        select:   false
    })
    password: string



    @ApiProperty({
        example: ['user', 'admin'],
        description: "Roles del usuario",
    })
    @Column({
        type:    'text',
        array:    true,
        default:['user']
    })
    roles:      string[]

}
