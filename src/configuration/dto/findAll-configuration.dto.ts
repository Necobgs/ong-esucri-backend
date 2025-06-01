import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { module_name } from "../configuration.enum";

export class FindAllConfiguration extends PaginationDto{
    @IsOptional()
    @ApiProperty({description:"Nome do módulo",type:"string",example:"email",required:false})
    module_name: module_name

    @IsOptional()
    @ApiProperty({description:"Chave da configuração",type:"string",example:"email_adress_sender",required:false})
    key:string
}