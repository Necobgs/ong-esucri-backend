import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[TypeOrmModule.forFeature([Notice])],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
