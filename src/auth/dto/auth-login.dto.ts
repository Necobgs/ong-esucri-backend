import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthLoginDto{

    @IsNotEmpty()
    @ApiProperty({example:"joao.silva@gmail.com",nullable:false,required:true})
    email:string;

    @IsNotEmpty()
    @ApiProperty({example:"joao123",nullable:false,required:true})
    password:string;

}