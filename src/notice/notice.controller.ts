import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, Req, Res, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { NoticeResponseDto } from './dto/response-notice-findAll.dto';
import { MessageResponseDto } from 'src/common/dto/response-message.dto';
import { Request,Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Notícias')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria uma nova notícia' })
  @ApiCreatedResponse({ type: NoticeResponseDto })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createNoticeDto: CreateNoticeDto,
    @UploadedFile() file: Express.Multer.File) {
      console.log(createNoticeDto)
    return this.noticeService.create(createNoticeDto,file);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as notícias com paginação' })
  @ApiOkResponse({ type: [NoticeResponseDto] })
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.noticeService.findAll(pagination);
    return {
      data: result.data,
      total: result.total,
    };
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
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateNoticeDto: UpdateNoticeDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.noticeService.update(id, updateNoticeDto, file);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma notícia pelo ID' })
  @ApiOkResponse({ type: MessageResponseDto })
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
