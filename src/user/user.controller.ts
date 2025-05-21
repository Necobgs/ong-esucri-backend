import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/response-user.dto';
import { MessageResponseDto } from 'src/common/dto/response-message.dto';

@ApiTags('Usuários') // agrupa endpoints no Swagger
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Email já está em uso' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários com paginação' })
  @ApiOkResponse({
    description: 'Lista de usuários',
    type: [UserResponseDto],
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, example: 'created_at' })
  @ApiQuery({ name: 'order', required: false, example: 'ASC | DESC' })
  findAll(@Query() dto: PaginationDto) {
    return this.userService.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiOkResponse({
    description: 'Usuário encontrado',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de um usuário' })
  @ApiOkResponse({
    description: 'Usuário atualizado com sucesso',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover usuário por ID' })
  @ApiOkResponse({
    description: 'Usuário removido com sucesso',
    type: MessageResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
