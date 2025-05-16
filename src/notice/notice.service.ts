import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { QueryBuilder, Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { skip } from 'node:test';

@Injectable()
export class NoticeService {

  
  constructor(
    @InjectRepository(Notice) 
    private readonly repository:Repository<Notice>){
  }

  async create(createNoticeDto: CreateNoticeDto) {
    const notice = this.repository.create(createNoticeDto);
    console.log(notice)
    return await this.repository.save(notice);
  }

  async findAll(paginationDTO:PaginationDto) {
    const pagination={
      page:  paginationDTO.page??   1,
      limit: paginationDTO.limit??  10,
      sortBy:paginationDTO.sortBy?? 'created_at',
      order: paginationDTO.order??  'ASC'
    };
    const skip = (pagination.page - 1) * pagination.limit
    return await this.repository.find({
      skip:skip,
      take:pagination.limit
    });
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
