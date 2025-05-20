import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { randomUUID } from 'crypto';


@Injectable()
export class NoticeService {

  
  constructor(
    @InjectRepository(Notice) 
    private readonly repository:Repository<Notice>){
  }

  async create(createNoticeDto: CreateNoticeDto) {
    const notice = this.repository.create(createNoticeDto);
    notice.id = randomUUID();
    return await this.repository.save(notice);
  }

  async findAll(paginationDTO:PaginationDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      order = 'ASC',
    } = paginationDTO;

    const skip = (page - 1) * limit
    return await this.repository.find({
      skip:skip,
      take:limit,
      order:{
        [sortBy]: order.toUpperCase()
      }
    },
    );
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({id});
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const notice = await this.repository.findOneOrFail({where:{id}})
    return await this.repository.merge(notice,updateNoticeDto);
  }

  async remove(id: string) {
    const notice = await this.repository.findOneByOrFail({id})
    return this.repository.remove([notice]);
  }
}
