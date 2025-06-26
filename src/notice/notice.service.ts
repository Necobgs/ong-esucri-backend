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

  async findAll(dto: PaginationDto) {
  const skip = (dto.page - 1) * dto.limit;
  const [notices, totalCount] = await this.repository.findAndCount({
    select: {
      id: true,
      title: true,
      description: true,
      created_at: true,
      view: true,
      image: true,
      author: {
        id: true,
        username: true,
        created_at: true,
        email: true,
      },
    },
    skip: skip,
    take: dto.limit,
    order: {
      [dto.sortBy]: dto.order.toUpperCase(),
    },
    relations: ['author'],
  });

  return {
    data: notices,
    total: totalCount,
  };
}

  async findOne(id: string, req: Request, res: Response) {
    const notice = await this.repository.findOne({
      where:{id},
      relations:['author']
    });
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

  async update(id: string, updateNoticeDto: UpdateNoticeDto, file?: Express.Multer.File) {
  const notice = await this.repository.findOneOrFail({ where: { id } });

  let newFilename = notice.image;

  if (file) {
    // Apagar imagem antiga, se existir
    if (notice.image) {
      const oldImagePath = path.resolve(process.cwd(), 'uploads', notice.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Salvar nova imagem
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    newFilename = `${uniqueSuffix}${ext}`;
    const filePath = path.resolve(process.cwd(), 'uploads', newFilename);
    await fs.writeFileSync(filePath, file.buffer);
  }

  const updatedNotice = {
    ...notice,
    ...updateNoticeDto,
    image: newFilename,
  };

  return await this.repository.save(updatedNotice);
}


  async remove(id: string) {
    const notice = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(notice);
  }
}