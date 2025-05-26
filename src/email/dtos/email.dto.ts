import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class EmailDto{

    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    @ApiProperty({
        example:"Estou entrando em contato pois gostaria de ser professor..."
    })
    message:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example:"joao.silva@gmail.com"
    })
    email_contact:string;


    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @ApiProperty({
        example:"Candidato a professor"
    })
    subject:string

    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    @ApiProperty({
        example:"Nome da pessoa que está contatanto"
    })
    name:string
}