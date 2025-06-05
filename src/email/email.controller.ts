import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dtos/email.dto';
import { Request, Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  sendToOng(@Body() emailDto:EmailDto, @Req() req:Request,@Res() res:Response){
    this.emailService.sendToOng(emailDto,req,res)
  }
}
