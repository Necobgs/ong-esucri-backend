import { Controller, Get, Post, Body, Patch, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ConfigurationResponseDto } from './dto/response-configuration.dto';

@ApiTags('Configurações')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria uma nova configuração' })
  @ApiCreatedResponse({ type: ConfigurationResponseDto })
  create(@Body() createConfigurationDto: CreateConfigurationDto) {
    return this.configurationService.create(createConfigurationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as configurações com paginação' })
  @ApiOkResponse({ type: [ConfigurationResponseDto] })
  findAll() {
    return this.configurationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma configuração pelo ID' })
  @ApiOkResponse({ type: ConfigurationResponseDto })
  findOne(@Param('id') id: string) {
    return this.configurationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma configuração existente' })
  @ApiOkResponse({ type: ConfigurationResponseDto })
  update(@Param('id') id: string, @Body() updateConfigurationDto: UpdateConfigurationDto) {
    return this.configurationService.update(id, updateConfigurationDto);
  }
}
