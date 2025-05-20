import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryColumn('uuid')
    id:string;

    @Column({nullable:false})
    username:string

    @Column({nullable:false})
    email:string

    @Column({nullable:false})
    password:string

    @CreateDateColumn()
    created_at:Date;
}