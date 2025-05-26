import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dtos/email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  sendToOng(@Body() emailDto:EmailDto){
    this.emailService.sendToOng(emailDto)
  }
}
