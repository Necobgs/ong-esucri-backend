import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateNoticeDto {

    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({
        example:"Marca história batida!",
        description:"Título da notícia",
        required:true,
        type:'string'
    })
    title:string;

    @ApiProperty({ example: '/uploads/image.jpg', required: false })
    @IsString()
    @IsOptional()
    file: string | null; // Campo opcional para o caminho da imagem

    @IsNotEmpty()
    @ApiProperty({
        example:"Conseguir atingir a meta",
        description:"Breve descrição da notícia",
        required:true,
        type:'string'
    })
    description:string;

    @IsNotEmpty()
    @ApiProperty({
        example:"Na data 12/12/2012 conseguimos...",
        description:"Texto da notícia",
        required:true,
        type:'string'
    })
    notice_text:string;

}
