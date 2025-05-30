import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Repository } from 'typeorm';
import { Notice } from './entities/notice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly repository: Repository<Notice>,
  ) {}

  async create(createNoticeDto: CreateNoticeDto, file?: Express.Multer.File) {
    console.log('Arquivo recebido:', file);
    let filename : string | null  = null;
    if(file){
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      filename = `${uniqueSuffix}${ext}`;
      const filePath = path.resolve(process.cwd(), 'uploads', filename);
      await fs.writeFileSync(filePath, file.buffer);
    }
      const notice = this.repository.create({
      ...createNoticeDto,
      id: randomUUID(),
      image: filename,
    });
    return await this.repository.save(notice);
  }

  async findAll(paginationDTO: PaginationDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      order = 'ASC',
    } = paginationDTO;

    const skip = (page - 1) * limit;
    return await this.repository.find({
      select: {
        id: true,
        title: true,
        description: true,
        created_at: true,
        view: true,
        author: {
          id: true,
          username: true,
          created_at: true,
          email: true,
        },
      },
      skip: skip,
      take: limit,
      order: {
        [sortBy]: order.toUpperCase(),
      },
      relations: ['author'],
    });
  }

  async findOne(id: string, req: Request, res: Response) {
    const notice = await this.repository.findOneBy({ id });
    if (!notice) return res.status(HttpStatus.NOT_FOUND).json(null);
    const cookieName = `news_viewed_${id}`;
    const hasViewed = req.cookies[cookieName];
    if (!hasViewed) {
      await this.repository.increment({ id }, 'view', 1);
      res.cookie(cookieName, true, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      notice.view += 1;
    }
    return res.json(notice);
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto) {
    const notice = await this.repository.findOneOrFail({ where: { id } });
    return await this.repository.save({ ...notice, ...updateNoticeDto });
  }

  async remove(id: string) {
    const notice = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(notice);
  }
}