import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { ConfigurationService } from 'src/configuration/configuration.service';


@Module({
  imports:[ConfigurationModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
