import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty({
        example:"João da Silva",
        description:"Nome do usuário",
        required:true,
        type:'string',
    })
    username:string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example:"joao.silva@gmail.com",
        description:"Email do usuário",
        format:"email",
        required:true,
        type:'string',
    })
    email:string

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({
        example:"M1nh4S3nh4",
        description:"Senha do usuário",
        minLength:6,
        format:'password',
        required:true,
        type:'string',
    })
    password:string

}