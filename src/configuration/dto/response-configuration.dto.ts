import { ApiProperty } from '@nestjs/swagger';

export class ConfigurationResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'whatsapp_number' })
  key: string;

  @ApiProperty({ example: 'Número do whatsapp' })
  name: string;

  @ApiProperty({ example: '(48) 9999-9999' })
  value: string;

  @ApiProperty({ example: '2024-05-20T15:30:00.000Z' })
  created_at: Date;

  @ApiProperty({example:"varchar"})
  type:'varchar' | 'number' | 'html' | 'text' | `password`;

  @ApiProperty({example: "social"})
  module_name: 'email' | 'transaction' | 'social'

}
