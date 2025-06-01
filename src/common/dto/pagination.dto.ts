import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString, IsIn } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @ApiProperty({description:"Número da página",type:"number",example:1,default:1,nullable:true,required:false})
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @ApiProperty({description:"Limite de respostas, Quantidade por página",type:"number",example:10,default:10,nullable:true,required:false})
  limit: number = 10;

  @IsOptional()
  @IsString()
  @ApiProperty({description:"Ordenar por alguma propriedade do DTO",type:"string",example:"created_at",default:"created_at",nullable:true,required:false})
  sortBy: string = 'created_at';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  @ApiProperty({description:"Tipo da ordem",type:"string",example:"DESC",default:"ASC",nullable:true,required:false
  })
  order: 'ASC' | 'DESC' = 'ASC';
}
