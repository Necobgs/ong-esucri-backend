import { ApiProperty } from '@nestjs/swagger';

export class NoticeResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Marca história batida!' })
  title: string;

  @ApiProperty({ example: 'Conseguir atingir a meta' })
  description: string;

  @ApiProperty({ example: 'Na data 12/12/2012 conseguimos...' })
  notice_text: string;

  @ApiProperty({ example: '2024-05-20T15:30:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: 42 })
  view: number;
}
