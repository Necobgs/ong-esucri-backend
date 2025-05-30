import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { NoticeResponseDto } from './dto/response-notice-findAll.dto';
import { MessageResponseDto } from 'src/common/dto/response-message.dto';
import { Request,Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Notícias')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria uma nova notícia' })
  @ApiCreatedResponse({ type: NoticeResponseDto })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createNoticeDto: CreateNoticeDto,
    @UploadedFile() file: Express.Multer.File) {
    return this.noticeService.create(createNoticeDto,file);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as notícias com paginação' })
  @ApiOkResponse({ type: [NoticeResponseDto] })
  findAll(@Query() pagination: PaginationDto) {
    return this.noticeService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma notícia pelo ID' })
  @ApiOkResponse({ type: NoticeResponseDto })
  findOne(@Param('id') id: string, @Req() req:Request, @Res() res: Response) {
    return this.noticeService.findOne(id,req,res);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma notícia existente' })
  @ApiOkResponse({ type: NoticeResponseDto })
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(id, updateNoticeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma notícia pelo ID' })
  @ApiOkResponse({ type: MessageResponseDto })
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
