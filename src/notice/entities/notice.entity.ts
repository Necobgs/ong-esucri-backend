import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notice {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar',length:100})
    title:string;

    @Column({type:'varchar',length:200})
    description:string;

    @Column({type:'text'})
    notice_text:string;

    @CreateDateColumn()
    created_at:Date;

    @Column({type:'integer'})
    view:number;
}