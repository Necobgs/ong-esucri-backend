import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, IsNotEmpty, isString, IsString } from "class-validator";

export class CreateConfigurationDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:"whatsapp_number",
        description:"Chave identificadora da configuração",
        type:'string',
        required:true,
    })
    key:string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:"Número do whatsapp",
        description:"Nome legivel ao público da configuração",
        required:true,
        type:'string',
    })
    name:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:"(48) 9999-9999",
        description:"Valor da configuração",
        type:'string',
        required:true,
        format:'phone'
    })
    value:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:'"varchar" | "number | "html" | "text"',
        description:"Tipo de dado da configuração",
        type:'string',
        required:true
    })
    type:'varchar' | 'number' | 'html' | 'text';
}