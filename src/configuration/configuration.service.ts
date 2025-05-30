import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { module_name } from './configuration.enum';

@Injectable()
export class ConfigurationService {

  constructor(
    @InjectRepository(Configuration) private readonly configurationRepository:Repository<Configuration>
  ){}

  async create(createConfigurationDto: CreateConfigurationDto) {
    const configExists = await this.configurationRepository.findOneBy({key:createConfigurationDto.key}) 
    if (configExists) throw new BadRequestException()
    const config = this.configurationRepository.create({
      ...createConfigurationDto,
      id:randomUUID()
    });
    return await this.configurationRepository.save(config);
  }

  async findAll(module_name:module_name) {
    return await this.configurationRepository.findBy({module_name});
  }

  async findOneById(id: string) {
    return await this.configurationRepository.findOneBy({id});
  }

  async findOneByKey(key: string) {
    return await this.configurationRepository.findOneBy({key});
  }

  async update(id: string, updateConfigurationDto: UpdateConfigurationDto) {
    const config = await this.configurationRepository.findOneByOrFail({id});
    const configUpdated = {
      ...config,
      ...updateConfigurationDto
    }
    return await this.configurationRepository.save(configUpdated);
  }

}
