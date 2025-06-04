import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthLoginDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({example:"joao.silva@gmail.com",nullable:false,required:true,minLength:6})
    email:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:"joao123",nullable:false,required:true})
    password:string;

}