import { ApiProperty } from '@nestjs/swagger';


export class UserResponseDto {

  @ApiProperty({ example: '4f25d3d2-b88a-4e50-a16d-75fdaf5a2c58' })
  id: string;

  @ApiProperty({ example: 'João da Silva' })
  username: string;

  @ApiProperty({ example: 'joao.silva@gmail.com' })
  email: string;

  @ApiProperty({ example: '2025-05-20T18:40:12.712Z' })
  created_at: Date;

  @ApiProperty({example: 'true'})
  activated:boolean
}