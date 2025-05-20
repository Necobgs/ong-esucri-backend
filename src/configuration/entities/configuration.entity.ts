import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Configuration {

    @PrimaryColumn('uuid')
    id:string;

    @Column({length:100,unique:true})
    key:string

    @Column({length:100})
    name:string;

    @Column({length:255})
    value:string;

    @CreateDateColumn()
    created_at:Date

}