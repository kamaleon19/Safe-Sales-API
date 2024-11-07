import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:       string

    @Column({
        type:    'text',
        nullable: false
    })
    name:     string


    @Column({
        type:    'text',
        unique:   true,
        nullable: false
    })
    email:    string


    @Column({
        type:    'text',
        nullable: false,
        select:   false
    })
    password: string


    @Column({
        type:    'text',
        array:    true,
        default:['user']
    })
    rol:      string[]

}
