import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoticeService {

  
  constructor(
    @InjectRepository(Notice) 
    private readonly repository:Repository<Notice>){
  }

  async create(createNoticeDto: CreateNoticeDto) {
    const notice = this.repository.create(createNoticeDto);
    return await this.repository.save(notice);
  }

  findAll() {
    return `This action returns all notice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notice`;
  }

  update(id: number, updateNoticeDto: UpdateNoticeDto) {
    return `This action updates a #${id} notice`;
  }

  remove(id: number) {
    return `This action removes a #${id} notice`;
  }
}
