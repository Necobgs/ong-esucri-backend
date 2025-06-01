import { module_name, type } from "../configuration.enum";
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

    @Column({type:"varchar",enum:['varchar', 'number', 'html', 'text']})
    type: type;

    @Column({type:"varchar", enum: ['email', 'transaction', 'social']})
    module_name: module_name 

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}