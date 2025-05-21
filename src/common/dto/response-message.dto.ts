import { ApiProperty } from "@nestjs/swagger";

export class MessageResponseDto {
  @ApiProperty({ example: 'Deletado com sucesso' })
  message: string;
}