import { Controller, Get, Post, Body, Patch, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ConfigurationResponseDto } from './dto/response-configuration.dto';
import { module_name } from './configuration.enum';
import { FindAllConfiguration } from './dto/findAll-configuration.dto';
import { MODULES_DESCRIPTION } from './moduleDescription';
// import { modulesdes }



@ApiTags('Configurações')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}
  
  
  
  @Get()
  @ApiOperation({ summary: 'Lista todas as configurações pelo módulo' ,description:MODULES_DESCRIPTION})
  @ApiOkResponse({ type: [ConfigurationResponseDto] })
  findAll(@Query() dto:FindAllConfiguration) {
    return this.configurationService.findAll(dto);
  }

  @Get(':key')
  @ApiOperation({ summary: 'Busca uma configuração pela KEY',description:MODULES_DESCRIPTION })
  @ApiOkResponse({ type: ConfigurationResponseDto })
  findOneByKey(@Param('key') key: string) {
    return this.configurationService.findOneByKey(key);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza configurações existente' })
  @ApiOkResponse({ type: ConfigurationResponseDto })
  update(@Body() updateConfigurationsDto: UpdateConfigurationDto[]) {
    return this.configurationService.update(updateConfigurationsDto);
  }
}
