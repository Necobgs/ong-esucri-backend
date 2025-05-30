import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Notice {

    @PrimaryColumn('uuid')
    id:string;

    @Column({type:'varchar',length:100})
    title:string;

    @Column({type:'varchar',length:200})
    description:string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string | null; // Novo campo para armazenar o caminho da imagem

    @Column({type:'text'})
    notice_text:string;
    
    @ManyToOne(() => User,{nullable:true})
    @JoinColumn()
    author:User;

    @CreateDateColumn()
    created_at:Date;

    @Column({type:'integer',default:0})
    view:number;
}