import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Configuration {

    @PrimaryColumn('uuid')
    id:string;

    @Column({length:100,unique:true})
    key:string

    @Column({length:100})
    name:string;

    @Column({type:'text',nullable:true})
    value:string;

    @Column({type:"varchar"})
    type: 'varchar' | 'number' | 'html' | 'text';

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}